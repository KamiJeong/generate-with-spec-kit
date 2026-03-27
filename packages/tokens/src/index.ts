import { motion } from './motion';
import { gray, primary } from './primitives/colors';
import { fontFamily, fontWeight } from './primitives/typography';
import { semantic } from './semantic';

export const colors = {
  gray,
  primary
} as const;

export const brandColor = primary['500'];

export type ColorScale = keyof typeof colors.gray;
export type SemanticColor = keyof typeof semantic;

export { fontFamily, fontWeight, motion, semantic };

const tokens = {
  brandColor,
  colors,
  fontFamily,
  fontWeight,
  motion,
  semantic
};

export default tokens;
