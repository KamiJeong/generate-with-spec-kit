import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FeaturesSection } from '@web/components/sections/FeaturesSection';
import { features } from '@web/content/site';

describe('FeaturesSection', () => {
  it('renders 3 to 6 feature cards with title and description', () => {
    // @req FR-003
    render(<FeaturesSection />);

    expect(features.length).toBeGreaterThanOrEqual(3);
    expect(features.length).toBeLessThanOrEqual(6);
    for (const feature of features) {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    }
  });

  it('uses a semantic section landmark', () => {
    render(<FeaturesSection />);

    expect(document.querySelector('section#features')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /팀이 빠르게 이해/ })
    ).toBeInTheDocument();
  });
});
