import { grayHsl, primaryHsl } from '../primitives/colors';

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
  ring: alphaVar('--ring')
} as const;

export const semanticHsl = {
  background: '0 0% 100%',
  foreground: grayHsl['950'],
  card: '0 0% 100%',
  cardForeground: grayHsl['950'],
  popover: '0 0% 100%',
  popoverForeground: grayHsl['950'],
  primary: primaryHsl['500'],
  primaryForeground: '0 0% 100%',
  secondary: grayHsl['100'],
  secondaryForeground: grayHsl['900'],
  muted: grayHsl['100'],
  mutedForeground: grayHsl['500'],
  accent: grayHsl['200'],
  accentForeground: grayHsl['900'],
  destructive: primaryHsl['500'],
  destructiveForeground: '0 0% 100%',
  border: grayHsl['200'],
  input: grayHsl['200'],
  ring: primaryHsl['500']
} as const;

export const radius = '0.5rem';
