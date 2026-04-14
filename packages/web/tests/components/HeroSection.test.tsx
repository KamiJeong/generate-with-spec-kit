import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HeroSection } from '@web/components/sections/HeroSection';
import { siteConfig, stats } from '@web/content/site';

describe('HeroSection', () => {
  it('renders the service value, CTA, and semantic structure', () => {
    // @req FR-001 @req SC-001
    render(<HeroSection />);

    expect(
      screen.getByRole('heading', { level: 1, name: siteConfig.tagline })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '문의 폼으로 이동' })
    ).toHaveAttribute('href', '#contact');
    expect(document.querySelector('section#hero')).toBeInTheDocument();
  });

  it('renders stat cards from site content', () => {
    render(<HeroSection />);

    for (const stat of stats) {
      expect(screen.getAllByText(stat.value).length).toBeGreaterThan(0);
      expect(screen.getAllByText(stat.label).length).toBeGreaterThan(0);
    }
  });
});
