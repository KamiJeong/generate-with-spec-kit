import { describe, expect, it } from 'vitest';

import {
  getRouteByPath,
  pageRoutes,
  supportNavItems,
  topLevelNavItems,
} from '@sfood/routing/routes';

describe('SFood route contract', () => {
  it('defines the exact 8 public paths once', () => {
    expect(pageRoutes.map((route) => route.path)).toEqual([
      '/',
      '/about',
      '/sustainability',
      '/brands',
      '/talent',
      '/support/notice',
      '/support/news',
      '/support/faq',
    ]);
    expect(new Set(pageRoutes.map((route) => route.path)).size).toBe(8);
  });

  it('groups support routes under the support nav metadata', () => {
    expect(supportNavItems.map((route) => route.path)).toEqual([
      '/support/notice',
      '/support/news',
      '/support/faq',
    ]);
    expect(supportNavItems.every((route) => route.navGroup === 'support')).toBe(
      true
    );
    expect(topLevelNavItems.every((route) => !route.navGroup)).toBe(true);
  });

  it('returns undefined for unknown paths so App can render the fallback', () => {
    expect(getRouteByPath('/missing')).toBeUndefined();
    expect(getRouteByPath('/about')?.label).toBe('회사소개');
  });
});
