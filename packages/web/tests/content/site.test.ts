import { describe, expect, it } from 'vitest';

import {
  features,
  navItems,
  siteConfig,
  stats,
  testimonials,
} from '@web/content/site';

describe('site content', () => {
  it('keeps the feature list within the required range', () => {
    // @req FR-003
    expect(features.length).toBeGreaterThanOrEqual(3);
    expect(features.length).toBeLessThanOrEqual(6);
  });

  it('defines required fields for page content', () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.tagline).toBeTruthy();
    expect(siteConfig.description).toBeTruthy();
    expect(siteConfig.ctaLabel).toBeTruthy();
    expect(navItems.every((item) => item.label && item.href.startsWith('#'))).toBe(
      true
    );
    for (const feature of features) {
      expect(feature.icon).toBeDefined();
      expect(feature.title).toBeTruthy();
      expect(feature.description).toBeTruthy();
    }
    expect(stats.every((stat) => stat.value && stat.label)).toBe(true);
    expect(
      testimonials.every(
        (testimonial) =>
          testimonial.quote &&
          testimonial.author &&
          testimonial.role &&
          testimonial.initials
      )
    ).toBe(true);
  });
});
