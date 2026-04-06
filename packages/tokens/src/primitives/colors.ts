export const gray = {
  '50': '#fafafa',
  '100': '#f4f4f5',
  '200': '#e4e4e7',
  '300': '#d4d4d8',
  '400': '#a1a1aa',
  '500': '#71717a',
  '600': '#52525b',
  '700': '#3f3f46',
  '800': '#27272a',
  '900': '#18181b',
  '950': '#09090b'
} as const;

export const brand = {
  '50': '#fff1f1',
  '100': '#ffd9db',
  '200': '#ffb3b7',
  '300': '#ff7d84',
  '400': '#f54d57',
  '500': '#ea2d37',
  '600': '#d92b33',
  '700': '#b31f27',
  '800': '#8a1219',
  '900': '#600c11',
  '950': '#3b0709'
} as const;

export const destructivePalette = {
  '50': '#fff7ed',
  '100': '#ffedd5',
  '200': '#fed7aa',
  '300': '#fdba74',
  '400': '#fb923c',
  '500': '#f97316',
  '600': '#ea6c0a',
  '700': '#c2590c',
  '800': '#9a450a',
  '900': '#7c3a07',
  '950': '#431d03'
} as const;

export const grayHsl = {
  '50': '0 0% 98%',
  '100': '240 5% 96%',
  '200': '240 6% 90%',
  '300': '240 5% 84%',
  '400': '240 5% 65%',
  '500': '240 4% 46%',
  '600': '240 5% 34%',
  '700': '240 4% 27%',
  '800': '240 4% 16%',
  '900': '240 4% 10%',
  '950': '240 6% 4%'
} as const;

export const brandHsl = {
  '50': '357 100% 97%',
  '100': '357 100% 93%',
  '200': '357 100% 85%',
  '300': '357 100% 74%',
  '400': '357 90% 63%',
  '500': '357 81% 55%',
  '600': '357 70% 51%',
  '700': '357 71% 41%',
  '800': '357 74% 30%',
  '900': '357 76% 21%',
  '950': '357 78% 13%'
} as const;

export const destructiveHsl = {
  '50': '22 100% 97%',
  '100': '22 100% 92%',
  '200': '22 100% 83%',
  '300': '22 97% 72%',
  '400': '22 95% 62%',
  '500': '22 94% 53%',
  '600': '22 93% 47%',
  '700': '22 87% 40%',
  '800': '22 84% 32%',
  '900': '22 84% 26%',
  '950': '22 87% 14%'
} as const;

export const chartHsl = {
  '1': brandHsl['600'],
  '2': grayHsl['700'],
  '3': brandHsl['300'],
  '4': grayHsl['400'],
  '5': brandHsl['700'],
  grid: grayHsl['300'],
  surface: '0 0% 100%'
} as const;

/**
 * @deprecated `primary` is a compatibility alias for `brand`. Use `brand` instead.
 * This export will be removed in a future major version once all consumers migrate.
 */
export const primary = brand;

/**
 * @deprecated `primaryHsl` is a compatibility alias for `brandHsl`. Use `brandHsl` instead.
 * This export will be removed in a future major version once all consumers migrate.
 */
export const primaryHsl = brandHsl;
