import { semanticHsl } from '../src/semantic';

const pairs = [
  ['foreground', 'background'],
  ['cardForeground', 'card'],
  ['popoverForeground', 'popover'],
  ['primaryForeground', 'primary'],
  ['secondaryForeground', 'secondary'],
  ['mutedForeground', 'background'],
  ['accentForeground', 'accent'],
  ['destructiveForeground', 'destructive']
] as const;

const hslToRgb = (value: string) => {
  const [hRaw, sRaw, lRaw] = value.split(' ');
  const h = Number(hRaw) / 360;
  const s = Number(sRaw.replace('%', '')) / 100;
  const l = Number(lRaw.replace('%', '')) / 100;

  if (s === 0) {
    const channel = Math.round(l * 255);
    return [channel, channel, channel] as const;
  }

  const hueToRgb = (p: number, q: number, t: number) => {
    let next = t;
    if (next < 0) next += 1;
    if (next > 1) next -= 1;
    if (next < 1 / 6) return p + (q - p) * 6 * next;
    if (next < 1 / 2) return q;
    if (next < 2 / 3) return p + (q - p) * (2 / 3 - next) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return [
    Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
    Math.round(hueToRgb(p, q, h) * 255),
    Math.round(hueToRgb(p, q, h - 1 / 3) * 255)
  ] as const;
};

const luminance = (value: string) => {
  const [r, g, b] = hslToRgb(value).map((channel) => {
    const srgb = channel / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (foreground: string, background: string) => {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
};

const rows = pairs.map(([foreground, background]) => {
  const ratio = contrastRatio(semanticHsl[foreground], semanticHsl[background]);
  return {
    foreground,
    background,
    ratio: ratio.toFixed(2),
    status: ratio >= 4.5 ? 'PASS' : 'FAIL'
  };
});

console.table(rows);
