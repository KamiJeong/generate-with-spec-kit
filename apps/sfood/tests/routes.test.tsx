import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@sfood/App';
import { allRoutes, navigationItems, supportRoutes } from '@sfood/routes/route-map';

const expectedPaths = [
  '/',
  '/about',
  '/sustainability',
  '/brands',
  '/talent',
  '/support/notice',
  '/support/news',
  '/support/faq',
];

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('SFood route contract', () => {
  it('defines exactly the requested public routes', () => {
    expect(allRoutes.map((route) => route.path)).toEqual(expectedPaths);
  });

  it('keeps every navigation href backed by a route', () => {
    const routePaths = new Set(allRoutes.map((route) => route.path));

    for (const item of navigationItems) {
      expect(routePaths.has(item.href)).toBe(true);
    }
  });

  it.each(allRoutes)('renders $path with the page title', (route) => {
    renderAt(route.path);

    expect(
      screen.getByRole('heading', { level: 1, name: route.title })
    ).toBeInTheDocument();
  });

  it('groups support routes together', () => {
    expect(supportRoutes.map((route) => route.path)).toEqual([
      '/support/notice',
      '/support/news',
      '/support/faq',
    ]);
  });
});
