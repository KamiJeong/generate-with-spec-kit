import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HomePage } from '@sfood/pages/HomePage';
import {
  certifications,
  getLatestArticles,
  productCategories,
  siteConfig,
} from '@sfood/content/sfood-content';

describe('HomePage', () => {
  it('renders hero, mission, product categories, certifications, and latest two articles', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { level: 1, name: siteConfig.tagline })
    ).toBeInTheDocument();
    expect(screen.getByAltText(/프리미엄 육가공 제품/)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.mission)).toBeInTheDocument();
    for (const category of productCategories.slice(0, 4)) {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    }
    for (const certification of certifications) {
      expect(screen.getByText(certification.name)).toBeInTheDocument();
    }

    const latest = screen.getByRole('region', { name: '최신 소식' });
    for (const article of getLatestArticles(2)) {
      expect(within(latest).getByText(article.title)).toBeInTheDocument();
    }
  });
});
