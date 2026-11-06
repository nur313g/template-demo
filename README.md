# Web Template UMKM (Astro + JSON + Sveltia CMS)

Template website statis yang ringan, mobile-first, dan SEO-friendly. Seluruh isi diatur lewat `src/data/site.json`, bisa diedit lewat panel admin `/admin`.

## Mulai cepat (di GitHub Codespaces atau laptop)

```bash
npm install
npm run klien -- laundry warna=ocean gaya=soft   # preset + pilihan tampilan (lihat TEMPLATE_GUIDE bagian 2b)
npm run dev                   # buka http://localhost:4321
npm run build                 # hasil di folder dist/
```

## Struktur

```
src/data/site.json          isi website (satu-satunya file yang berubah per klien)
src/components/sections/    12 blok section (hero, layanan, tarif, galeri, video, ...)
src/styles/themes.css       tema warna/font (ocean, sunset, forest)
presets/                    titik awal per jenis usaha
public/images/              foto klien
public/admin/               panel admin (Sveltia CMS)
TEMPLATE_GUIDE.md           panduan lengkap untuk AI dan Anda
docs/PROMPT_AI.md           prompt siap pakai untuk AI
docs/INTAKE_FLOW.md         alur order: form, tagihan, bayar, kerja
docs/apps-script-invoice.gs invoice otomatis dari Google Form
```

## Tambah tema, preset, atau section

- Tema: salin blok `[data-theme="..."]` di `themes.css`, ganti warna, tambahkan nama di `public/admin/config.yml`.
- Preset: salin file di `presets/`, ubah isi.
- Section baru: buat komponen di `src/components/sections/`, daftarkan di `src/pages/index.astro` (registry), tambahkan tipe di `config.yml`.

Baca `TEMPLATE_GUIDE.md` untuk detail.
