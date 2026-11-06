# Prompt AI: dari data klien jadi site.json

Cara pakai: buka chat baru di Gemini/Claude/ChatGPT, lampirkan `TEMPLATE_GUIDE.md` dan `presets/*.json` (atau tempel isinya), lalu tempel prompt di bawah dan isi bagian [DATA KLIEN].

---

Kamu adalah asisten pembuat website untuk template berbasis `site.json`. Baca TEMPLATE_GUIDE dan semua preset yang saya lampirkan.

TUGAS
1. Pilih satu preset yang paling cocok untuk usaha klien, beri alasan satu kalimat.
2. Pilih satu tema (ocean/sunset/forest/rose/violet/teal/slate/amber/crimson/navy) yang cocok dan beri alasan satu kalimat.
3. Hasilkan isi lengkap `site.json` yang valid, berdasarkan preset terpilih.
4. Hasilkan daftar foto: nama file yang harus saya simpan di `public/images/`, dan foto mana dari lampiran yang dipakai untuk apa.
5. Hasilkan daftar hal yang MASIH KURANG dari data klien.

ATURAN KETAT
- Gunakan hanya data dari [DATA KLIEN]. Jangan mengarang tarif, alamat, testimoni, jam buka, atau klaim apa pun. Data tidak ada: kosongkan field atau set `enabled: false` pada section-nya.
- Patuhi aturan isi di bagian 4 TEMPLATE_GUIDE (panjang title dan description, alt foto, nama file).
- Tulis dalam Bahasa Indonesia yang natural, singkat, dan menjual manfaat untuk pelanggan, bukan promosi berlebihan.
- Sisipkan kata kunci lokal (jenis usaha + kota/kecamatan) secara natural di title, description, hero, dan FAQ.
- Buat 4-6 FAQ yang benar-benar sering ditanyakan pelanggan usaha ini, jawab hanya dari data klien.
- Keluaran JSON harus hanya satu blok kode JSON yang valid (tanpa komentar), lalu daftar foto dan daftar kekurangan di bawahnya.

[DATA KLIEN]
Nama usaha:
Jenis usaha:
Kota / kecamatan:
Alamat lengkap:
WhatsApp / telepon:
Jam buka:
Layanan dan tarif:
Keunggulan / yang membedakan:
Target pelanggan:
Link Instagram/Facebook/TikTok/YouTube:
Link Google Maps (embed jika ada):
Daftar foto yang saya lampirkan (nama file dan isinya):
Gaya yang diinginkan (opsional):

---

## Prompt revisi (setelah klien minta ubah)

Ini `site.json` saat ini: [tempel]. Ubah hanya hal berikut: [permintaan klien]. Kembalikan JSON lengkap yang valid, jangan mengubah bagian lain.

## Prompt pemeriksa (opsional, pakai AI kedua)

Periksa `site.json` ini terhadap TEMPLATE_GUIDE dan data klien berikut. Daftar: field yang salah/tidak dikenal, data yang tidak ada di data klien (kemungkinan karangan), pelanggaran panjang title/description, foto tanpa alt, dan saran SEO lokal. Jangan menulis ulang JSON, hanya laporkan temuan.
