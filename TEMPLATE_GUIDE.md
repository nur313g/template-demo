# TEMPLATE_GUIDE (untuk AI dan untuk Anda)

Dokumen ini adalah "buku panduan" template. Berikan file ini ke AI bersama data klien, dan AI cukup menghasilkan isi `src/data/site.json`. AI TIDAK perlu mengubah kode.

## 1. Cara kerja

- Seluruh isi website ada di satu file: `src/data/site.json`.
- Halaman dirender dari daftar `sections`, urutannya mengikuti urutan di daftar.
- Tampil/sembunyi: `"enabled": true/false`. Pindah urutan: pindahkan objeknya.
- Tema: `"theme"` salah satu dari 10 tema: `ocean` (biru), `sunset` (oranye), `forest` (hijau), `rose` (merah muda), `violet` (ungu), `teal` (hijau tosca), `slate` (abu gelap), `amber` (cokelat emas), `crimson` (merah), `navy` (biru tua). Tambah tema baru di `src/styles/themes.css`.
- Logo yang sudah memuat teks nama usaha: set `"logoHasName": true` di `business` agar teks nama tidak muncul dobel di header.
- Foto disimpan di `public/images/`. Di JSON cukup tulis nama file, mis. `"hero.jpg"`.

## 2. Preset niche (titik awal)

Jalankan `npm run preset -- <nama>` untuk menyalin preset ke `site.json`.

| Preset | Tema bawaan | Cocok untuk |
|---|---|---|
| `laundry` | ocean | laundry, jasa cuci, dry cleaning, kebersihan |
| `jasa-pewarnaan` | sunset | jasa kustom/estimasi lewat foto, pewarnaan, reparasi, tailor |
| `jasa-website` | forest | halaman jualan jasa Anda sendiri (promosi) |
| `salon` | rose | salon kecantikan, spa, nail art, makeup |
| `barbershop` | slate | barbershop, pangkas rambut |
| `bengkel` | crimson | bengkel motor/mobil, cuci kendaraan, ban |
| `kuliner` | amber | warung, rumah makan, katering, kafe |
| `toko` | teal | toko UMKM, katalog produk, reseller |
| `kursus` | violet | kursus, les privat, bimbel, pelatihan |
| `servis-ac` | navy | servis AC, elektronik, tukang, jasa panggilan |

Catatan preset baru: logo, foto utama, dan `ogImage` dikosongkan agar tidak ada gambar rusak. Section galeri dan testimoni dimatikan (`enabled: false`) sampai ada foto dan testimoni asli. Kota "Malang" dan semua tarif hanyalah contoh, wajib diganti sesuai data klien.

Menambah preset baru: salin salah satu file di `presets/`, ubah isinya, simpan dengan nama baru.
Aturan pemilihan: pilih preset yang susunan section-nya paling dekat dengan usaha klien. Sisanya cukup aktifkan/matikan section.

## 2b. Variasi tampilan (tanpa mengubah konten)

Selain `theme` (warna), ada pilihan lain di `site.json`. Semuanya hanya mengubah tampilan, isi tidak tersentuh.

| Field | Pilihan |
|---|---|
| `theme` | ocean, sunset, forest, rose, violet, teal, slate, amber, crimson, navy |
| `style` | clean (bawaan), bold, soft, elegant, compact |
| `layout.hero` | split (bawaan), center, full (butuh foto landscape) |
| `layout.services` | cards (bawaan), list, icons |
| `layout.gallery` | grid (bawaan), masonry |
| `layout.header` | left (bawaan), center |

Total 10 x 5 x 3 x 3 x 2 x 2 = 1.800 kombinasi. Field yang kosong memakai nilai bawaan.

Kode desain: `warna-gaya-hero-layanan-galeri-menu`, mis. `forest-bold-center-list-masonry-center`.

Perintah cepat untuk klien baru:

```bash
npm run klien -- salon warna=rose gaya=elegant hero=center
npm run klien -- toko kode=teal-compact-split-cards-masonry-left
```

Halaman demo untuk calon pembeli: `npm run klien -- demo-etalase` (atau set `"demo": true` di `site.json`). Muncul tombol "Ganti tampilan" untuk mencoba semua pilihan secara langsung, lalu tombol "Pilih desain ini" mengirim pilihan ke WhatsApp Anda beserta kodenya. Alamat dengan pilihan tertentu bisa dibagikan: `https://domain/?d=forest-bold-center-list-masonry-center`.

Menambah pilihan baru: tambah nama di `src/lib/designs.js` (OPTIONS), tulis CSS-nya di `src/styles/variants.css` (atau blok tema di `themes.css`), dan tambah nama di `public/admin/config.yml`.

## 2c. Halaman uji coba untuk calon klien (/coba)

Calon klien mengisi data usaha, foto, preset, dan tampilan di `/coba`, lalu `/preview` merender website sungguhan dengan komponen yang sama seperti hasil akhir. Tidak ada deploy dan tidak ada data yang disimpan.

- Hanya aktif di proyek dengan `"demo": true` di `site.json` (mis. `npm run klien -- demo-etalase`). Situs klien biasa tidak memuat halaman ini dan tidak memakai adapter.
- `/coba` statis. `/preview` dirender di Cloudflare Pages Functions (paket gratis). Foto diperkecil dan disimpan di browser pengunjung (sessionStorage), tidak dikirim ke server; hanya teks yang dikirim lewat POST.
- Bagian yang tidak diisi memakai teks contoh dari preset. Gambar contoh preset sengaja tidak ditampilkan.
- Logika pengisian ada di `src/demo/build-site.js`. Mau menambah isian: tambah input di `src/demo/coba.astro` dan petakan di `build-site.js`.
- Deploy: proyek Cloudflare Pages terpisah untuk demo. Build command `npm run build`, output `dist`. Cek batas paket gratis Cloudflare di halaman harga resminya.
- Tes lokal: `npm install`, `npm run klien -- demo-etalase`, `npm run dev`, buka `/coba`.

## 3. Daftar section dan field

Semua section punya `type`, `enabled`, dan opsional `navLabel` (kalau diisi, muncul di menu atas) serta `id` (anchor).

| type | Field utama |
|---|---|
| `hero` | title, subtitle, badge, ctaLabel, secondaryLabel, secondaryHref, image, imageAlt, waMessage |
| `about` | title, text (pisahkan paragraf dengan baris baru), image, points[] |
| `services` | title, subtitle, items[{icon, title, description, price}] |
| `pricing` | title, subtitle, note, items[{name, price, unit, description, highlight, features[]}] |
| `gallery` | title, images[{src, alt, caption}] |
| `video` | title, youtube (link atau ID) |
| `testimonials` | title, items[{name, role, text, rating}] |
| `faq` | title, items[{q, a}] (otomatis jadi schema FAQ untuk Google) |
| `map` | title, embedUrl (isi src dari Google Maps > Bagikan > Sematkan peta) |
| `contact` | title, subtitle (data diambil dari `business`) |
| `social` | title (link diambil dari `social`) |
| `cta` | title, text, buttonLabel, buttonHref (kosong = WhatsApp) |

Bagian atas `site.json`: `meta` (title, description, url, ogImage), `business` (nama, kontak, alamat, jam, schemaType), `analytics` (ga4Id), `social` (instagram, facebook, tiktok, youtube).

## 4. Aturan isi (penting untuk SEO dan kualitas)

1. `meta.title` maks 60 karakter: kata kunci utama + kota. Contoh: "Laundry Kiloan di Surabaya | Antar Jemput".
2. `meta.description` maks 155 karakter, berisi manfaat dan ajakan bertindak.
3. Satu halaman hanya satu H1 (otomatis dari `hero.title`). Masukkan kata kunci + kota secara natural.
4. Setiap foto wajib `alt` yang menjelaskan isi foto. Jangan isi alt dengan kata kunci berulang.
5. Foto: format JPG/WebP, lebar maks 1600px, ukuran ideal di bawah 200 KB. Kompres dulu (squoosh.app, gratis).
6. Nama file foto huruf kecil, tanpa spasi: `hasil-cuci-1.jpg`.
7. Jangan mengarang tarif, alamat, testimoni, atau klaim ("terbaik", "nomor 1", sertifikat). Pakai hanya data dari klien. Data yang belum ada: kosongkan field atau matikan section-nya.
8. `meta.url` harus diisi alamat final website (untuk sitemap dan canonical).
9. Nomor WhatsApp format 08xxx atau 62xxx.

## 4b. Keterbatasan template saat ini (jujur)

- Satu halaman (landing) dulu. Multi-halaman (paket Business) dibuat dengan menambah file di `src/pages/`.
- Foto belum dioptimasi otomatis; kompres sebelum diunggah.
- Panel admin edit `site.json` lewat form. Mengubah desain/kode tetap lewat Anda.

## 5. Deploy ke Cloudflare Pages

1. Buat repo dari template ini (GitHub: Use this template atau salin), nama mis. `klien-namausaha`, set private.
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git > pilih repo.
3. Framework preset: Astro. Build command: `npm run build`. Output directory: `dist`.
4. Setelah deploy, hubungkan domain klien (Custom domains), lalu isi `meta.url` dan `robots.txt` dengan domain final.
5. Setiap commit ke branch `main` (termasuk dari panel admin) otomatis terbit.

## 6. Panel admin (`/admin`)

- Buka `https://domain-klien/admin/`. Panel memakai Sveltia CMS dan login dengan GitHub.
- Edit `public/admin/config.yml`: ganti `repo: USERNAME/NAMA-REPO` dan `site_url`.
- Login: pilih "Login dengan token", pakai GitHub Personal Access Token (fine-grained, hanya repo itu, izin Contents: read and write). Token ini rahasia, jangan dibagikan di chat.
- Untuk klien awam, lebih aman Anda yang memegang token (mode dikelola Anda). Klien yang mau edit sendiri butuh akun GitHub dan diundang sebagai collaborator.
- Proteksi tambahan opsional: Cloudflare Access untuk path `/admin/*`.

## 7. Checklist sebelum serahkan ke klien

- [ ] Semua teks, tarif, alamat, dan nomor WA sudah dikonfirmasi klien
- [ ] Foto sudah dikompres dan punya alt
- [ ] `meta.title`, `meta.description`, `meta.url` terisi
- [ ] Peta tampil dan tombol WhatsApp membuka chat yang benar
- [ ] Dites di HP (lebar 360px) dan Lighthouse/PageSpeed mobile
- [ ] GA4 dan Search Console terpasang atas akun klien, sitemap dikirim (`/sitemap-index.xml`)
- [ ] Data usaha terdaftar di Google Business Profile (atas nama klien)
