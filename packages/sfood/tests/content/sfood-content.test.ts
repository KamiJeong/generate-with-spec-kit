import { describe, expect, it } from 'vitest';

import {
  articles,
  brands,
  certifications,
  faqs,
  getLatestArticles,
  getNewsArticles,
  getNoticeArticles,
  productCategories,
  siteConfig,
} from '@sfood/content/sfood-content';

describe('SFood static content', () => {
  it('keeps required mission, brand split, categories, and certifications', () => {
    expect(siteConfig.mission).toContain('더 좋은 식품으로 더 좋은 세상을 만든다');
    expect(new Set(brands.map((brand) => brand.type))).toEqual(
      new Set(['B2B', 'B2C'])
    );
    expect(productCategories.length).toBeGreaterThanOrEqual(4);
    expect(certifications.map((certification) => certification.name)).toEqual([
      'FSSC 22000',
      'HACCP',
      'DLG',
    ]);
  });

  it('sorts notice, news, and latest article surfaces by descending date', () => {
    for (const list of [
      getNoticeArticles(),
      getNewsArticles(),
      getLatestArticles(2),
    ]) {
      expect(list).toEqual(
        [...list].sort((a, b) => b.date.localeCompare(a.date))
      );
    }
    expect(getLatestArticles(2)).toHaveLength(2);
    expect(getNoticeArticles().every((article) => article.type === 'notice')).toBe(
      true
    );
    expect(getNewsArticles().every((article) => article.type === 'news')).toBe(
      true
    );
  });

  it('requires FAQ fields and useful image alt text', () => {
    expect(faqs.every((faq) => faq.question && faq.answer && faq.category)).toBe(
      true
    );
    expect(
      articles
        .filter((article) => article.type === 'news')
        .every((article) => article.image?.alt)
    ).toBe(true);
    expect(brands.every((brand) => brand.image.alt)).toBe(true);
  });
});
