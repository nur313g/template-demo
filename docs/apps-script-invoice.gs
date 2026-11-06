/**
 * Google Apps Script: invoice otomatis saat Google Form dikirim.
 * Pasang di Google Sheets (hasil respons) > Ekstensi > Apps Script.
 * Pasang trigger: onFormSubmit, sumber "Dari spreadsheet", jenis "Saat formulir dikirim".
 */

// ===== KONFIGURASI (ubah sesuai kebutuhan) =====
const CFG = {
  brand: 'Nama Jasa Website Anda',
  adminEmail: 'email-anda@gmail.com',
  payment: 'Transfer BANK ... a.n. ... No. rek ...\nAtau QRIS (kirim bukti ke WhatsApp 08xxxxxxxxxx)',
  dueDays: 2,
  // Nama kolom di Sheet harus sama persis dengan judul pertanyaan Form
  col: { pkg: 'Pilih paket', name: 'Nama lengkap', email: 'Email', wa: 'WhatsApp', biz: 'Nama usaha' },
  // Harga paket (angka rupiah). Kunci harus sama dengan pilihan di Form.
  prices: { 'Starter': 450000, 'Basic': 850000, 'Business': 1400000, 'Premium': 1900000 },
  dpPercentFrom: 1000000, // paket >= nilai ini: DP 50%
};

function onFormSubmit(e) {
  const sh = e.range.getSheet();
  const row = e.range.getRow();
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const values = sh.getRange(row, 1, 1, sh.getLastColumn()).getValues()[0];
  const get = (title) => values[headers.indexOf(title)];

  const pkgRaw = String(get(CFG.col.pkg) || '');
  const pkg = Object.keys(CFG.prices).find((k) => pkgRaw.indexOf(k) === 0 || pkgRaw.indexOf(k) > -1);
  const price = pkg ? CFG.prices[pkg] : 0;
  const invNo = 'INV-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd') + '-' + String(row).padStart(3, '0');
  const due = new Date(Date.now() + CFG.dueDays * 86400000);
  const dp = price >= CFG.dpPercentFrom ? Math.round(price / 2) : price;
  const rp = (n) => 'Rp ' + n.toLocaleString('id-ID');

  // Tulis kolom tambahan di sebelah kanan data form
  const last = sh.getLastColumn();
  ['Invoice', 'Total', 'Tagihan awal', 'Status'].forEach((h, i) => {
    if (headers.indexOf(h) === -1) sh.getRange(1, last + 1 + i).setValue(h);
  });
  const h2 = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  sh.getRange(row, h2.indexOf('Invoice') + 1).setValue(invNo);
  sh.getRange(row, h2.indexOf('Total') + 1).setValue(price);
  sh.getRange(row, h2.indexOf('Tagihan awal') + 1).setValue(dp);
  sh.getRange(row, h2.indexOf('Status') + 1).setValue('MENUNGGU BAYAR');

  const name = get(CFG.col.name);
  const email = get(CFG.col.email);
  const body =
    `Halo ${name},\n\nTerima kasih sudah order di ${CFG.brand}.\n\n` +
    `Invoice: ${invNo}\nUsaha: ${get(CFG.col.biz)}\nPaket: ${pkg || pkgRaw}\n` +
    `Total: ${rp(price)}\nBayar sekarang: ${rp(dp)}${dp < price ? ' (DP 50%, sisa saat website siap dipublikasikan)' : ''}\n` +
    `Batas bayar: ${Utilities.formatDate(due, 'Asia/Jakarta', 'd MMM yyyy')}\n\n` +
    `Cara bayar:\n${CFG.payment}\n\n` +
    `Setelah bayar, kirim bukti transfer ke WhatsApp kami dengan menyebut nomor invoice. ` +
    `Pengerjaan dimulai setelah pembayaran dikonfirmasi.\n\nSalam,\n${CFG.brand}`;

  if (email) MailApp.sendEmail(email, `Invoice ${invNo} - ${CFG.brand}`, body);
  MailApp.sendEmail(CFG.adminEmail, `Order baru ${invNo}`, `Order baru dari ${name} (${get(CFG.col.wa)}), paket ${pkg || pkgRaw}.\nBuka Sheet untuk detail.`);
}
