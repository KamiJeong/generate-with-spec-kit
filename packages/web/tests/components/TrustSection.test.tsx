import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TrustSection } from '@web/components/sections/TrustSection';
import { stats, testimonials } from '@web/content/site';

describe('TrustSection', () => {
  it('renders stats and testimonials', () => {
    // @req FR-004
    render(<TrustSection />);

    for (const stat of stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
    for (const testimonial of testimonials) {
      expect(screen.getByText(testimonial.author)).toBeInTheDocument();
      expect(screen.getByText(testimonial.role)).toBeInTheDocument();
      expect(screen.getByText(`"${testimonial.quote}"`)).toBeInTheDocument();
    }
  });

  it('uses blockquote semantics for testimonial quotes', () => {
    render(<TrustSection />);

    expect(document.querySelector('section#trust')).toBeInTheDocument();
    expect(document.querySelectorAll('blockquote')).toHaveLength(
      testimonials.length
    );
  });
});
