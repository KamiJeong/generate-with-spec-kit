import { brandHsl, chartHsl, destructiveHsl, grayHsl } from '../primitives/colors';

const alphaVar = (token: string) => `hsl(var(${token}) / <alpha-value>)`;

export const semantic = {
  background: alphaVar('--background'),
  foreground: alphaVar('--foreground'),
  card: alphaVar('--card'),
  cardForeground: alphaVar('--card-foreground'),
  popover: alphaVar('--popover'),
  popoverForeground: alphaVar('--popover-foreground'),
  primary: alphaVar('--primary'),
  primaryForeground: alphaVar('--primary-foreground'),
  secondary: alphaVar('--secondary'),
  secondaryForeground: alphaVar('--secondary-foreground'),
  muted: alphaVar('--muted'),
  mutedForeground: alphaVar('--muted-foreground'),
  accent: alphaVar('--accent'),
  accentForeground: alphaVar('--accent-foreground'),
  destructive: alphaVar('--destructive'),
  destructiveForeground: alphaVar('--destructive-foreground'),
  border: alphaVar('--border'),
  input: alphaVar('--input'),
  ring: alphaVar('--ring'),
  chart1: alphaVar('--chart-1'),
  chart2: alphaVar('--chart-2'),
  chart3: alphaVar('--chart-3'),
  chart4: alphaVar('--chart-4'),
  chart5: alphaVar('--chart-5'),
  chartGrid: alphaVar('--chart-grid'),
  chartSurface: alphaVar('--chart-surface')
} as const;

export const semanticHsl = {
  background: '0 0% 100%',
  foreground: grayHsl['950'],
  card: '0 0% 100%',
  cardForeground: grayHsl['950'],
  popover: '0 0% 100%',
  popoverForeground: grayHsl['950'],
  primary: brandHsl['600'],
  primaryForeground: '0 0% 100%',
  secondary: grayHsl['100'],
  secondaryForeground: grayHsl['900'],
  muted: grayHsl['100'],
  mutedForeground: grayHsl['500'],
  accent: grayHsl['200'],
  accentForeground: grayHsl['900'],
  destructive: destructiveHsl['600'],
  destructiveForeground: grayHsl['950'],
  border: grayHsl['200'],
  input: grayHsl['200'],
  ring: brandHsl['600'],
  chart1: chartHsl['1'],
  chart2: chartHsl['2'],
  chart3: chartHsl['3'],
  chart4: chartHsl['4'],
  chart5: chartHsl['5'],
  chartGrid: chartHsl.grid,
  chartSurface: chartHsl.surface
} as const;

export const radius = '0.5rem';
