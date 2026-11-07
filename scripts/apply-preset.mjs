// Pakai: npm run klien -- <preset> [warna=rose] [gaya=elegan->elegant] [hero=center] [layanan=list] [galeri=masonry] [menu=center] [demo=1]
//   atau: npm run klien -- <preset> kode=forest-bold-center-list-masonry-center
// Menyalin presets/<nama>.json menjadi src/data/site.json, lalu menerapkan pilihan tampilan.
//   Susunan bagian: urutan=hero,faq,pricing,contact sembunyi=cta,map  (hero selalu paling atas)
// (npm run preset -- <nama> tetap bisa dipakai, dengan argumen yang sama)
import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { OPTIONS, fromCode, resolve } from '../src/lib/designs.js';

const [name, ...rest] = process.argv.slice(2);
const list = readdirSync('presets').filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''));

if (!name || !existsSync(`presets/${name}.json`)) {
  console.log('Preset tersedia:', list.join(', '));
  console.log('Contoh: npm run klien -- salon warna=rose gaya=elegant hero=center');
  console.log('Pilihan:', Object.entries(OPTIONS).map(([k, v]) => `${k}=${Object.keys(v).join('|')}`).join('  '));
  process.exit(name ? 1 : 0);
}
copyFileSync(`presets/${name}.json`, 'src/data/site.json');

const args = Object.fromEntries(rest.map((a) => a.split('=')).filter((p) => p.length === 2));
const alias = { warna: 'theme', theme: 'theme', gaya: 'style', style: 'style', hero: 'hero', layanan: 'services', services: 'services', galeri: 'gallery', gallery: 'gallery', menu: 'header', header: 'header' };
const site = JSON.parse(readFileSync('src/data/site.json', 'utf-8'));
const cur = resolve(site);
let pick = {};
if (args.kode) {
  pick = fromCode(args.kode);
  if (!pick) { console.log('Kode desain tidak valid:', args.kode); process.exit(1); }
}
for (const [a, v] of Object.entries(args)) {
  const k = alias[a];
  if (!k) continue;
  if (!OPTIONS[k][v]) { console.log(`Nilai "${v}" tidak dikenal untuk ${k}. Pilihan: ${Object.keys(OPTIONS[k]).join(', ')}`); process.exit(1); }
  pick[k] = v;
}
const d = { ...cur, ...pick };
site.theme = d.theme; site.style = d.style;
site.layout = { hero: d.hero, services: d.services, gallery: d.gallery, header: d.header };
const word = (x) => /^[a-z]+$/.test(x);
const urutan = (args.urutan || '').split(',').filter(word);
const sembunyi = (args.sembunyi || '').split(',').filter((x) => word(x) && x !== 'hero');
if (urutan.length) {
  const pos = (x) => { const i = urutan.indexOf(x.type); return i < 0 ? 1000 : i; };
  site.sections = site.sections
    .map((s, i) => ({ s, i }))
    .sort((a, b) => (a.s.type === 'hero' ? -1 : 0) + (b.s.type === 'hero' ? 1 : 0) || pos(a.s) - pos(b.s) || a.i - b.i)
    .map((x) => x.s);
}
for (const s of site.sections) if (sembunyi.includes(s.type)) s.enabled = false;
if (args.demo === '1') site.demo = true;
writeFileSync('src/data/site.json', JSON.stringify(site, null, 2) + '\n');
console.log(`OK: preset "${name}" | ${Object.values(d).join('-')} | bagian: ${site.sections.filter((x) => x.enabled !== false).map((x) => x.type).join(',')}${site.demo ? ' | demo' : ''}`);
