import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SiteHeader } from '@web/components/layout/SiteHeader';
import { navItems, siteConfig } from '@web/content/site';

describe('SiteHeader', () => {
  it('renders logo, desktop navigation links, CTA, and header semantics', () => {
    // @req FR-000 @req SC-004
    render(<SiteHeader />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: `${siteConfig.name} 홈` })
    ).toHaveAttribute('href', '#hero');
    expect(
      screen.getByRole('navigation', { name: '주요 섹션' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: siteConfig.ctaLabel })).toHaveAttribute(
      'href',
      '#contact'
    );
    for (const item of navItems) {
      expect(screen.getAllByRole('link', { name: item.label }).length).toBeGreaterThan(
        0
      );
    }
  });

  it('opens the mobile sheet from the hamburger button', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole('button', { name: '메뉴 열기' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('섹션 이동')).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: '모바일 섹션' })
    ).toBeInTheDocument();
  });
});
