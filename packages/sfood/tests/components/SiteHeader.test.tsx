import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SiteHeader } from '@sfood/components/layout/SiteHeader';
import { pageRoutes } from '@sfood/routing/routes';

describe('SiteHeader', () => {
  it('renders route links and marks the active page', () => {
    window.history.pushState({}, '', '/brands');

    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: 'SFood 홈' })).toHaveAttribute(
      'href',
      '/'
    );
    for (const route of pageRoutes) {
      expect(screen.getAllByRole('link', { name: route.label }).length).toBeGreaterThan(
        0
      );
    }
    expect(screen.getAllByRole('link', { name: '브랜드' })[0]).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('opens the mobile Sheet menu with support links', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole('button', { name: '메뉴 열기' }));

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByText('메뉴')).toBeInTheDocument();
    expect(
      within(dialog).getByRole('navigation', { name: '모바일 주요 메뉴' })
    ).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: 'FAQ' })).toHaveAttribute(
      'href',
      '/support/faq'
    );
  });
});
