import { describe, expect, it } from 'vitest';

import { semanticHsl } from '../src/semantic/index';
import { semanticHslDark } from '../src/semantic/dark';
import { contrastRatio } from './color-utils';

describe('dark semantic tokens', () => {
  it('exports the same keys as light semantic tokens and changes the background', () => {
    expect(Object.keys(semanticHslDark).sort()).toEqual(Object.keys(semanticHsl).sort());
    expect(semanticHslDark.background).not.toBe(semanticHsl.background);
  });

  it('keeps destructive separate from primary in dark mode', () => {
    expect(semanticHslDark.destructive).not.toBe(semanticHslDark.primary);
  });

  it.each([
    ['foreground', 'background'],
    ['destructiveForeground', 'destructive']
  ])('meets WCAG AA for %s on %s in dark mode', (foreground, background) => {
    const ratio = contrastRatio(
      semanticHslDark[foreground as keyof typeof semanticHslDark],
      semanticHslDark[background as keyof typeof semanticHslDark]
    );

    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
