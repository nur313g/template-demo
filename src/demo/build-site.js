// Menyusun data website uji coba dari isian form + preset. Fungsi murni (mudah dites).
import { OPTIONS } from '../lib/designs.js';

const PHOTO_KEYS = /^(logo|hero|g[1-6])$/;
const ph = (k) => `/placeholder.svg?foto=${k}`; // diganti foto asli di browser (lihat SitePage.astro)

export function buildSite(get, base) {
  const t = (k, n = 120) => String(get(k) ?? '').trim().slice(0, n);
  const site = JSON.parse(JSON.stringify(base));
  const b = site.business;

  const name = t('name', 60) || b.name;
  const phone = t('phone', 20).replace(/[^\d+]/g, '');
  b.name = name;
  b.tagline = t('tagline', 100) || b.tagline;
  if (phone) { b.phone = phone; b.whatsapp = phone; }
  b.address = t('address', 120);
  b.city = t('city', 50);
  b.region = '';
  b.email = '';
  b.geo = { lat: '', lng: '' };
  b.waMessage = `Halo ${name}, saya mau tanya layanan.`;
  const day = t('day', 40), time = t('time', 30);
  if (day || time) b.hours = [{ day: day || 'Setiap hari', time: time || 'Hubungi kami' }];

  const fotos = new Set(t('fotos', 60).split(',').filter((x) => PHOTO_KEYS.test(x)));
  b.logo = fotos.has('logo') ? ph('logo') : '';
  b.logoHasName = false;
  const gal = [...fotos].filter((k) => k.startsWith('g')).sort();

  site.meta = { ...site.meta, title: `${name}${b.tagline ? ' | ' + b.tagline : ''}`, description: b.tagline || name, ogImage: '', url: '' };
  site.social = {}; site.analytics = {}; site.footerNote = ''; site.demo = false;

  const rows = [1, 2, 3, 4, 5]
    .map((i) => ({ title: t(`s${i}_name`, 50), price: t(`s${i}_price`, 30), desc: t(`s${i}_desc`, 140) }))
    .filter((r) => r.title);
  const priced = rows.filter((r) => r.price);

  for (const s of site.sections || []) {
    if (s.type === 'hero') {
      s.title = t('heroTitle', 90) || b.tagline || s.title;
      s.subtitle = t('heroSub', 200) || s.subtitle;
      s.image = fotos.has('hero') ? ph('hero') : '';
      s.imageAlt = name;
    } else if (s.type === 'about') {
      if (t('about', 500)) { s.text = t('about', 500); s.points = []; }
      s.image = gal[0] ? ph(gal[0]) : '';
    } else if (s.type === 'services' && rows.length) {
      const icons = (s.items || []).map((x) => x.icon);
      s.items = rows.map((r, i) => ({ icon: icons.length ? icons[i % icons.length] : '✔', title: r.title, description: r.desc }));
    } else if (s.type === 'pricing' && rows.length) {
      if (priced.length) {
        const cta = s.items?.[0]?.ctaLabel || 'Pesan';
        s.items = priced.map((r) => ({ name: r.title, price: r.price, features: r.desc ? [r.desc] : [], ctaLabel: cta }));
        s.note = '';
      } else s.enabled = false;
    } else if (s.type === 'gallery') {
      s.images = gal.map((k, i) => ({ src: ph(k), alt: `Foto ${i + 1} ${name}` }));
      s.enabled = gal.length > 0;
    } else if (s.type === 'map' && !t('address')) {
      s.enabled = false;
    } else if (s.type === 'testimonials' || s.type === 'social' || s.type === 'video') {
      s.enabled = false;
    }
  }

  const o = (k) => (OPTIONS[k][t(k, 20)] ? t(k, 20) : undefined);
  site.theme = o('theme') || site.theme;
  site.style = o('style') || 'clean';
  site.layout = { hero: o('hero'), services: o('services'), gallery: o('gallery'), header: o('header') };
  return site;
}
