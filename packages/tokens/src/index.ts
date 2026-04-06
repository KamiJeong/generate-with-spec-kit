import { motion } from './motion';
import { brand, chartHsl, destructivePalette, gray, primary } from './primitives/colors';
import { fontFamily, fontWeight } from './primitives/typography';
import { semantic, semanticHsl } from './semantic';
import { semanticHslDark } from './semantic/dark';
import { getTheme, initTheme, setTheme } from './theme-utils';

export const colors = {
  gray,
  brand,
  destructivePalette,
  primary
} as const;

export const chart = chartHsl;

export const brandColor = brand['600'];

export type ColorScale = keyof typeof colors.gray;
export type SemanticColor = keyof typeof semantic;

export { fontFamily, fontWeight, getTheme, initTheme, motion, semantic, semanticHsl, semanticHslDark, setTheme };

const tokens = {
  brandColor,
  chart,
  colors,
  fontFamily,
  fontWeight,
  getTheme,
  initTheme,
  motion,
  semantic,
  semanticHsl,
  semanticHslDark,
  setTheme
};

export default tokens;
