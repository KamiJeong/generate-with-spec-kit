import { describe, expect, it } from 'vitest';

import preset from '../src/tailwind/preset';

describe('tailwind preset', () => {
  it('extends semantic colors with alpha-aware CSS variable references', () => {
    expect(preset.theme?.extend?.colors?.background).toBe(
      'hsl(var(--background) / <alpha-value>)'
    );
    expect(preset.theme?.extend?.colors?.primary).toMatchObject({
      DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
      foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
      500: '#d92b33'
    });
  });

  it('extends typography and border radius tokens', () => {
    expect(preset.theme?.extend?.fontFamily).toEqual({
      sans: ['"NanumBarunGothic"', 'AppleGothic', 'Tahoma', 'Arial', 'sans-serif']
    });
    expect(preset.theme?.extend?.fontWeight).toEqual({
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    });
    expect(preset.theme?.extend?.borderRadius).toEqual({
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    });
  });
});
