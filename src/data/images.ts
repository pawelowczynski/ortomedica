export const HERO_IMAGE = '/images/hero/ortodonta-lubin-konsultacja-skan-3d.webp';
export const HERO_SRCSET = [
  '/images/hero/ortodonta-lubin-konsultacja-skan-3d-480.webp 480w',
  '/images/hero/ortodonta-lubin-konsultacja-skan-3d-800.webp 800w',
  HERO_IMAGE + ' 1200w',
].join(', ');
export const HERO_SIZES = '(min-width: 1536px) 651px, (min-width: 1280px) 528px, (min-width: 1024px) 412px, calc(100vw - 48px)';

export function doctorImage(slug: string) {
  const key = slug.replace(/^dr-/, '').replace(/^lek-dent-/, '');
  const widths = key === 'kornelia-rumin' ? [320, 615] : [320, 640, 960];
  const fallback = key === 'kornelia-rumin' ? 615 : 640;
  return {
    src: `/images/team/${key}-${fallback}.webp`,
    srcset: widths.map(width => `/images/team/${key}-${width}.webp ${width}w`).join(', '),
  };
}

