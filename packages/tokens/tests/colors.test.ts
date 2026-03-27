import { describe, expect, it } from 'vitest';

import { brandColor, colors } from '../src/index';

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

  it('exposes the primary scale with exact hex values', () => {
    expect(colors.primary).toEqual({
      '50': '#fff1f1',
      '100': '#ffe0e1',
      '200': '#ffc0c2',
      '300': '#ff8e92',
      '400': '#f45b62',
      '500': '#d92b33',
      '600': '#b71e25',
      '700': '#96161c',
      '800': '#741015',
      '900': '#520a0e',
      '950': '#2e0405'
    });
  });

  it('exports the brand base color shortcut', () => {
    expect(brandColor).toBe('#d92b33');
  });
});
