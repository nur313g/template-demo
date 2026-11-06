// Daftar pilihan tampilan. Konten (site.json) tidak berubah; hanya atribut tampilan.
export const OPTIONS = {
  theme: {
    ocean: 'Ocean (biru)', sunset: 'Sunset (oranye)', forest: 'Forest (hijau)', rose: 'Rose (merah muda)',
    violet: 'Violet (ungu)', teal: 'Teal (tosca)', slate: 'Slate (abu gelap)', amber: 'Amber (cokelat emas)',
    crimson: 'Crimson (merah)', navy: 'Navy (biru tua)',
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
