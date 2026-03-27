import { describe, expect, it } from 'vitest';

import { fontFamily, fontWeight } from '../src/index';

describe('typography tokens', () => {
  it('exposes the NanumBarunGothic fallback stack in order', () => {
    expect(fontFamily.sans).toEqual([
      '"NanumBarunGothic"',
      'AppleGothic',
      'Tahoma',
      'Arial',
      'sans-serif'
    ]);
  });

  it('exposes the supported font weights', () => {
    expect(fontWeight).toEqual({
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    });
  });
});
