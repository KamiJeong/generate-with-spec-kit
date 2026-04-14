import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BrandsPage } from '@sfood/pages/BrandsPage';
import { brands } from '@sfood/content/sfood-content';

describe('BrandsPage', () => {
  it('renders B2B and B2C brand cards with slogans and categories', () => {
    render(<BrandsPage />);

    expect(screen.getByRole('heading', { level: 1, name: '브랜드' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'B2B' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'B2C' })).toBeInTheDocument();
    for (const brand of brands) {
      expect(screen.getByText(brand.name)).toBeInTheDocument();
      expect(screen.getByText(brand.slogan)).toBeInTheDocument();
      for (const category of brand.productCategories) {
        expect(screen.getAllByText(category).length).toBeGreaterThan(0);
      }
    }
  });
});
