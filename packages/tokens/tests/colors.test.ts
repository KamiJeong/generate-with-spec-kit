import { describe, expect, it } from 'vitest';

import { brandColor, colors } from '../src/index';
import { destructiveHsl } from '../src/primitives/colors';
import { getHue } from './color-utils';

describe('primitive colors', () => {
  it('exposes the gray scale with exact hex values', () => {
    expect(colors.gray).toEqual({
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
    });
  });

  it('exposes the brand scale with exact hex values', () => {
    expect(colors.brand).toEqual({
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
    });
  });

  it('exports the brand base color shortcut', () => {
    expect(brandColor).toBe('#d92b33');
  });

  it('keeps the destructive palette on a distinct orange-red hue', () => {
    expect(colors.destructivePalette).toBeDefined();
    expect(getHue(destructiveHsl['600'])).toBeGreaterThan(15);
    expect(getHue(destructiveHsl['600'])).toBeLessThan(30);
  });
});
