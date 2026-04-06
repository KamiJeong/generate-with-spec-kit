import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { colors, semantic } from '../src/index';

const semanticTokenNames = [
  'background',
  'foreground',
  'card',
  'cardForeground',
  'popover',
  'popoverForeground',
  'primary',
  'primaryForeground',
  'secondary',
  'secondaryForeground',
  'muted',
  'mutedForeground',
  'accent',
  'accentForeground',
  'destructive',
  'destructiveForeground',
  'border',
  'input',
  'ring',
  'chart1',
  'chart2',
  'chart3',
  'chart4',
  'chart5',
  'chartGrid',
  'chartSurface'
] as const satisfies ReadonlyArray<keyof typeof semantic>;

describe('palette completeness', () => {
  it('includes complete gray, brand, and destructive scales', () => {
    expect(Object.keys(colors.gray)).toHaveLength(11);
    expect(Object.keys(colors.brand)).toHaveLength(11);
    expect(Object.keys(colors.destructivePalette)).toHaveLength(11);
  });

  it('includes the full semantic token set without omissions or extras', () => {
    expect([...Object.keys(semantic)].sort()).toEqual([...semanticTokenNames].sort());
  });

  it('maps every semantic token to an alpha-aware CSS variable', () => {
    for (const name of semanticTokenNames) {
      expect(semantic[name]).toMatch(/^hsl\(var\(--[a-z0-9-]+\) \/ <alpha-value>\)$/);
    }
  });

  it('documents the palette catalog', () => {
    const contents = readFileSync(join(process.cwd(), 'TOKENS.md'), 'utf8');

    expect(contents).toContain('gray-50');
    expect(contents).toContain('gray-950');
    expect(contents).toContain('brand-50');
    expect(contents).toContain('brand-950');
    expect(contents).toContain('destructive-50');
    expect(contents).toContain('destructive-950');
    expect(contents).toContain('--background');
    expect(contents).toContain('--ring');
    expect(contents).toContain('--font-sans');
  });
});
