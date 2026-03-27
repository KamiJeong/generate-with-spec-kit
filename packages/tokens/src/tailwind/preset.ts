import type { Config } from 'tailwindcss';

import { gray, primary } from '../primitives/colors';
import { fontFamily, fontWeight } from '../primitives/typography';
import { semantic } from '../semantic';

const preset = {
  content: [],
  theme: {
    extend: {
      colors: {
        gray,
        primary: {
          ...primary,
          DEFAULT: semantic.primary,
          foreground: semantic.primaryForeground
        },
        background: semantic.background,
        foreground: semantic.foreground,
        card: {
          DEFAULT: semantic.card,
          foreground: semantic.cardForeground
        },
        popover: {
          DEFAULT: semantic.popover,
          foreground: semantic.popoverForeground
        },
        secondary: {
          DEFAULT: semantic.secondary,
          foreground: semantic.secondaryForeground
        },
        muted: {
          DEFAULT: semantic.muted,
          foreground: semantic.mutedForeground
        },
        accent: {
          DEFAULT: semantic.accent,
          foreground: semantic.accentForeground
        },
        destructive: {
          DEFAULT: semantic.destructive,
          foreground: semantic.destructiveForeground
        },
        border: semantic.border,
        input: semantic.input,
        ring: semantic.ring
      },
      fontFamily: {
        sans: [...fontFamily.sans]
      },
      fontWeight,
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  }
} satisfies Config;

export default preset;
