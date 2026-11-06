// Bersihkan nomor jadi format internasional tanpa +, mis. 0812-3456 -> 62812...
export function waNumber(n = '') {
  let d = String(n).replace(/\D/g, '');
  if (d.startsWith('0')) d = '62' + d.slice(1);
  return d;
}

export function waLink(site, text) {
  const num = waNumber(site.business.whatsapp || site.business.phone);
  const msg = text || site.business.waMessage || 'Halo, saya mau tanya layanan.';
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export function telLink(n = '') {
  return 'tel:+' + waNumber(n);
}

export function youtubeId(v = '') {
  const m = String(v).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : v;
}

export function img(src = '') {
  if (!src) return '';
  if (/^https?:\/\//.test(src) || src.startsWith('/')) return src;
  return '/images/' + src;
}
