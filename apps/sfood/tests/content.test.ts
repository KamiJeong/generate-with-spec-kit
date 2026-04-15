import { describe, expect, it } from 'vitest';
import {
  brandLines,
  contentEntries,
  faqItems,
  hiringSteps,
  pageContent,
} from '@sfood/content/site';
import { allRoutes, navigationItems } from '@sfood/routes/route-map';

const forbiddenQualityTerms = ['FSSC 22000', 'HACCP', 'DLG'] as const;

describe('SFood content invariants', () => {
  it('provides content for every requested page', () => {
    for (const route of allRoutes) {
      expect(pageContent[route.pageKey]).toBeDefined();
      expect(pageContent[route.pageKey].title).toBe(route.title);
    }
  });

  it('keeps exact certification and award names out of authored content', () => {
    const serialized = JSON.stringify({
      pageContent,
      brandLines,
      contentEntries,
      faqItems,
      hiringSteps,
    });

    for (const term of forbiddenQualityTerms) {
      expect(serialized).not.toContain(term);
    }
  });

  it('contains at least one consumer and one business brand line', () => {
    expect(brandLines.some((line) => line.audience === 'consumer')).toBe(true);
    expect(brandLines.some((line) => line.audience === 'business')).toBe(true);
  });

  it('keeps notice and news entries list-only with complete summaries', () => {
    const notices = contentEntries.filter((entry) => entry.type === 'notice');
    const news = contentEntries.filter((entry) => entry.type === 'news');

    expect(notices).toHaveLength(3);
    expect(news).toHaveLength(3);

    for (const entry of contentEntries) {
      expect(entry.title).toBeTruthy();
      expect(entry.dateLabel).toMatch(/20\d{2}/);
      expect(entry.summary.length).toBeGreaterThan(20);
      expect('href' in entry).toBe(false);
      expect(JSON.stringify(entry)).not.toContain('자세히 보기');
    }
  });

  it('covers all required FAQ categories', () => {
    expect(new Set(faqItems.map((item) => item.category))).toEqual(
      new Set(['brand', 'product', 'quality', 'business', 'talent'])
    );
  });

  it('keeps hiring steps ordered from application to final decision', () => {
    expect(hiringSteps.map((step) => step.step)).toEqual([1, 2, 3, 4]);
    expect(hiringSteps[0].title).toContain('지원');
    expect(hiringSteps.at(-1)?.title).toContain('최종');
  });

  it('keeps navigation labels unique and ordered', () => {
    const labels = navigationItems.map((item) => item.label);

    expect(new Set(labels).size).toBe(labels.length);
    expect(navigationItems.map((item) => item.order)).toEqual(
      [...navigationItems.map((item) => item.order)].sort((a, b) => a - b)
    );
  });
});
