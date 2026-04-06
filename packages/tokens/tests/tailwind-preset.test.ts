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
      600: '#d92b33'
    });
    expect(preset.theme?.extend?.colors?.destructive).toMatchObject({
      DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
      foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
      600: '#ea6c0a'
    });
  });

  it('extends typography and border radius tokens', () => {
    expect(preset.theme?.extend?.fontFamily).toEqual({
      sans: [
        'Pretendard Variable',
        'Pretendard',
        'Noto Sans KR',
        '-apple-system',
        'Apple SD Gothic Neo',
        'Malgun Gothic',
        'Nanum Gothic',
        'sans-serif'
      ],
      heading: [
        'Pretendard Variable',
        'Pretendard',
        'Noto Sans KR',
        '-apple-system',
        'Apple SD Gothic Neo',
        'Malgun Gothic',
        'Nanum Gothic',
        'sans-serif'
      ],
      mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'ui-monospace', 'monospace']
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
