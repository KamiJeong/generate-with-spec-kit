import { describe, expect, it } from 'vitest';

import { fontFamily, fontWeight } from '../src/index';

describe('typography tokens', () => {
  it('starts the sans stack with Pretendard Variable', () => {
    expect(fontFamily.sans[0]).toBe('Pretendard Variable');
  });

  it('includes Noto Sans KR in the sans stack', () => {
    expect(fontFamily.sans).toContain('Noto Sans KR');
  });

  it('defines heading and mono font families', () => {
    expect(fontFamily.heading).toEqual(fontFamily.sans);
    expect(fontFamily.mono).toEqual([
      'JetBrains Mono',
      'Fira Code',
      'Cascadia Code',
      'ui-monospace',
      'monospace'
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
