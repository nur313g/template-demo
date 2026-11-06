# Alur Order: Form, Tagihan, Bayar, Dikerjakan

Tujuan: klien cukup isi form, terima tagihan, bayar, lalu Anda kerjakan. Semua pakai alat gratis. Pembayaran dikonfirmasi manual (paling aman dan murah untuk awal).

## Gambaran alur

1. Klien membuka halaman promosi Anda (preset `jasa-website`) dan klik "Isi Form Order".
2. Klien mengisi Google Form: pilih paket, data usaha, link foto.
3. Form tersimpan ke Google Sheets. Apps Script otomatis membuat nomor invoice dan mengirim email tagihan ke klien (berisi rekening/QRIS dan batas bayar). Anda juga menerima notifikasi.
4. Klien membayar dan mengirim bukti lewat WhatsApp. Anda cek mutasi, ubah kolom Status jadi "LUNAS" (atau "DP").
5. Anda kerjakan: kirim data ke AI (`docs/PROMPT_AI.md`), buat repo klien dari template, deploy.
6. Klien review lewat link preview (`xxx.pages.dev`), revisi sesuai paket.
7. Pelunasan (jika DP), serah terima, domain dan akun atas nama klien, lalu tawarkan paket rawat bulanan.

Saran pembayaran: paket di bawah Rp 1 juta bayar penuh di awal; paket di atasnya DP 50% di awal, 50% sebelum website dipublikasikan. Cantumkan ini di form dan kontrak singkat.

## Pertanyaan Google Form

Bagian 1, Paket dan kontak
- Pilih paket (pilihan ganda: Starter / Basic / Business / Premium)
- Nama lengkap, WhatsApp, Email (wajib, untuk tagihan)
- Setuju syarat: revisi, pembayaran, domain atas nama klien (centang)

Bagian 2, Data usaha
- Nama usaha, jenis usaha, kota dan kecamatan, alamat lengkap
- Jam buka, nomor WhatsApp yang tampil di website
- Layanan dan tarif (paragraf, satu baris satu layanan)
- Keunggulan usaha, target pelanggan
- Link Instagram/Facebook/TikTok/YouTube, link Google Maps (jika ada)
- Apakah sudah punya domain? (ya/tidak, jika ya tulis domainnya)
- Gaya yang disuka (contoh website yang disukai, warna)

Bagian 3, Foto dan video
- Link folder Google Drive berisi logo dan foto (atur akses "siapa saja yang memiliki link: lihat"), atau kirim lewat WhatsApp
- Keterangan tiap foto (opsional)
- Link video YouTube (opsional)

Catatan: fitur unggah file langsung di Google Form mewajibkan pengisi login Google dan file tersimpan di Drive Anda (memakan kuota). Karena itu lebih mudah meminta link folder Drive. Alternatif form lain (Tally, Jotform) punya batas gratis berbeda, cek halaman resmi masing-masing.

## Sheet, invoice otomatis

1. Di Google Form: tab Respons > hubungkan ke Google Sheets.
2. Di Sheet: Ekstensi > Apps Script, tempel isi `docs/apps-script-invoice.gs`, sesuaikan bagian KONFIGURASI dan nama kolom.
3. Pasang trigger: ikon jam > Tambah pemicu > fungsi `onFormSubmit` > sumber: dari spreadsheet > saat formulir dikirim. Setujui izin.
4. Tes dengan mengisi form sendiri.

Batas kirim email Apps Script untuk akun gratis terbatas per hari (cek dokumentasi Google terbaru); untuk volume order UMKM biasanya cukup.

## Pembayaran

- Mulai dari transfer bank dan QRIS statis (QRIS dari bank/e-wallet usaha Anda). Konfirmasi manual lewat bukti transfer dan cek mutasi sendiri.
- Payment gateway (Midtrans, Xendit, dll) memotong biaya per transaksi dan umumnya butuh verifikasi usaha. Pertimbangkan nanti kalau order sudah banyak.
- Simpan bukti dan nomor invoice di Sheet (kolom Status, Tanggal bayar).
- Jangan simpan data kartu atau password klien di mana pun.

## Setelah lunas: checklist kerja

- [ ] Salin data form ke chat AI dengan `PROMPT_AI.md`
- [ ] Unduh foto dari Drive, kompres, simpan di `public/images/`
- [ ] Buat repo klien (private) dari template, tempel `site.json`, cek `npm run build` lolos
- [ ] Deploy ke Cloudflare Pages, kirim link preview
- [ ] Revisi, lalu hubungkan domain klien, GA4, Search Console
- [ ] Serah terima + panduan singkat + tawarkan paket rawat

## Promosi jasa Anda

- Pakai preset `jasa-website` sebagai halaman jualan Anda, taruh link form di tombol CTA.
- Jadikan website jasa pewarnaan Anda dan 2-3 contoh preset (laundry, salon, dll) sebagai portofolio demo.
- Daftarkan Google Business Profile jasa Anda, bagikan tautan di WhatsApp Business (katalog), Instagram, dan TikTok.
- Beri diskon "order pertama" atau komisi referral kecil ke klien lama.
