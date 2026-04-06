import { describe, expect, it } from 'vitest';

import { semanticHsl } from '../src/semantic/index';
import { contrastRatio } from './color-utils';

describe('semantic contrast', () => {
  it.each([
    ['foreground', 'background'],
    ['cardForeground', 'card'],
    ['popoverForeground', 'popover'],
    ['primaryForeground', 'primary'],
    ['destructiveForeground', 'destructive'],
    ['secondaryForeground', 'secondary'],
    ['mutedForeground', 'background'],
    ['accentForeground', 'accent']
  ])('meets WCAG AA for %s on %s', (foreground, background) => {
    const ratio = contrastRatio(
      semanticHsl[foreground as keyof typeof semanticHsl],
      semanticHsl[background as keyof typeof semanticHsl]
    );

    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps destructive separate from primary', () => {
    expect(semanticHsl.destructive).not.toBe(semanticHsl.primary);
  });

  it('meets WCAG AA for destructive foreground on destructive', () => {
    expect(contrastRatio(semanticHsl.destructiveForeground, semanticHsl.destructive)).toBeGreaterThanOrEqual(
      4.5
    );
  });
});
