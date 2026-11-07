// Daftar pilihan tampilan. Konten (site.json) tidak berubah; hanya atribut tampilan.
export const OPTIONS = {
  theme: {
    ocean: 'Ocean (biru)', sunset: 'Sunset (oranye)', forest: 'Forest (hijau)', rose: 'Rose (merah muda)',
    violet: 'Violet (ungu)', teal: 'Teal (tosca)', slate: 'Slate (abu gelap)', amber: 'Amber (cokelat emas)',
    crimson: 'Crimson (merah)', navy: 'Navy (biru tua)',
    indigo: 'Indigo (biru ungu)', olive: 'Olive (hijau zaitun)', mocha: 'Mocha (cokelat)', terracotta: 'Terakota (bata)',
    berry: 'Berry (magenta)', plum: 'Plum (ungu tua)', charcoal: 'Charcoal (hitam)', steel: 'Steel (biru baja)',
    pine: 'Pine (hijau tua)', lagoon: 'Lagoon (biru laut)',
  },
  style: { clean: 'Bersih', bold: 'Tegas', soft: 'Lembut', elegant: 'Elegan', compact: 'Ringkas' },
  hero: { split: 'Dua kolom', center: 'Di tengah', full: 'Gambar penuh' },
  services: { cards: 'Kartu', list: 'Daftar', icons: 'Ikon besar' },
  gallery: { grid: 'Kotak rata', masonry: 'Susun' },
  header: { left: 'Logo kiri', center: 'Logo tengah' },
};
export const LABELS = { theme: 'Warna', style: 'Gaya', hero: 'Bagian atas', services: 'Layanan', gallery: 'Galeri', header: 'Menu' };
export const ORDER = ['theme', 'style', 'hero', 'services', 'gallery', 'header'];
export const DEFAULTS = { theme: 'ocean', style: 'clean', hero: 'split', services: 'cards', gallery: 'grid', header: 'left' };

// site.json -> pilihan final (field kosong memakai bawaan)
export function resolve(site = {}) {
  const L = site.layout || {};
  const d = { theme: site.theme, style: site.style, hero: L.hero, services: L.services, gallery: L.gallery, header: L.header };
  const out = {};
  for (const k of ORDER) out[k] = d[k] && OPTIONS[k][d[k]] ? d[k] : DEFAULTS[k];
  return out;
}
// Kode desain: warna-gaya-hero-layanan-galeri-menu, mis. forest-bold-center-list-masonry-center
export const toCode = (d) => ORDER.map((k) => d[k]).join('-');
export function fromCode(code = '') {
  const p = String(code).trim().toLowerCase().split('-');
  if (p.length !== ORDER.length) return null;
  const out = {};
  for (let i = 0; i < ORDER.length; i++) {
    if (!OPTIONS[ORDER[i]][p[i]]) return null;
    out[ORDER[i]] = p[i];
  }
  return out;
}

export const PRESET_NAMES = {
  barbershop: 'Barbershop', bengkel: 'Bengkel', 'jasa-pewarnaan': 'Jasa pewarnaan pakaian', 'jasa-website': 'Jasa pembuatan website',
  kuliner: 'Kuliner / warung', kursus: 'Kursus / les', laundry: 'Laundry', salon: 'Salon', 'servis-ac': 'Servis AC', toko: 'Toko',
  katering: 'Katering', 'toko-kue': 'Toko kue / bakery', 'kos-kosan': 'Kos-kosan', 'rental-mobil': 'Rental mobil', fotografi: 'Fotografi',
  percetakan: 'Percetakan', 'pet-grooming': 'Pet grooming', fitness: 'Gym / fitness', renovasi: 'Jasa renovasi', florist: 'Toko bunga',
  'laundry-lengkap': 'Laundry: layanan lengkap (paket bertingkat)',
  'toko-fashion': 'Toko online: fashion', 'toko-kecantikan': 'Toko online: kecantikan', 'toko-makanan': 'Toko online: makanan', 'toko-gadget': 'Toko online: gadget', 'toko-rumah': 'Toko online: perlengkapan rumah',
};
export const SECTION_NAMES = {
  hero: 'Bagian atas', about: 'Tentang', services: 'Layanan', pricing: 'Harga', products: 'Produk', gallery: 'Galeri', faq: 'FAQ',
  map: 'Peta lokasi', contact: 'Kontak', cta: 'Ajakan pesan', video: 'Video', testimonials: 'Testimoni', social: 'Sosial media',
};

// Kelompok jenis usaha di daftar pilihan. Preset yang belum dimasukkan otomatis muncul di "Lainnya".
export const PRESET_GROUPS = [
  ['Laundry dan pakaian', ['laundry', 'jasa-pewarnaan']],
  ['Kecantikan dan perawatan', ['salon', 'barbershop', 'pet-grooming', 'fitness']],
  ['Kuliner', ['kuliner', 'katering', 'toko-kue']],
  ['Jasa dan perbaikan', ['servis-ac', 'bengkel', 'renovasi', 'rental-mobil', 'percetakan']],
  ['Kreatif, acara, dan pendidikan', ['fotografi', 'florist', 'kursus', 'jasa-website']],
  ['Properti', ['kos-kosan']],
  ['Toko online', ['toko', 'toko-fashion', 'toko-kecantikan', 'toko-makanan', 'toko-gadget', 'toko-rumah']],
];
// Preset alternatif: kunci alternatif -> preset induknya. Alternatif muncul di bawah induknya dan sebagai "Gaya alternatif" di preview.
export const ALT_OF = { 'laundry-lengkap': 'laundry' };
export const ALT_LABELS = { 'laundry-lengkap': 'Layanan lengkap (paket bertingkat)' };
export const baseOf = (k) => ALT_OF[k] || k;
export const altsOf = (k) => Object.keys(ALT_OF).filter((a) => ALT_OF[a] === k);
export function groupedPresets(keys) {
  const have = new Set(keys), used = new Set(), out = [];
  const lab = (k) => PRESET_NAMES[k] || k;
  for (const [group, list] of PRESET_GROUPS) {
    const items = [];
    for (const k of list) {
      for (const x of [k, ...altsOf(k)]) {
        if (have.has(x) && !used.has(x)) { used.add(x); items.push({ key: x, label: (x !== k ? '↳ ' : '') + lab(x) }); }
      }
    }
    if (items.length) out.push({ group, items });
  }
  const rest = keys.filter((k) => !used.has(k)).map((k) => ({ key: k, label: lab(k) }));
  if (rest.length) out.push({ group: 'Lainnya', items: rest });
  return out;
}
