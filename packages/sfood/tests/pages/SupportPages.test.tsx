import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FaqPage } from '@sfood/pages/FaqPage';
import { NewsPage } from '@sfood/pages/NewsPage';
import { NoticePage } from '@sfood/pages/NoticePage';
import { getNewsArticles, getNoticeArticles } from '@sfood/content/sfood-content';

describe('Support pages', () => {
  it('renders notices in date-descending order', () => {
    render(<NoticePage />);

    const list = screen.getByRole('list', { name: '공지사항 목록' });
    const noticeTitles = within(list).getAllByRole('heading', { level: 2 });
    expect(noticeTitles.map((heading) => heading.textContent)).toEqual(
      getNoticeArticles().map((article) => article.title)
    );
  });

  it('renders news cards with images and summaries', () => {
    render(<NewsPage />);

    for (const article of getNewsArticles()) {
      expect(screen.getByText(article.title)).toBeInTheDocument();
      expect(screen.getByText(article.summary)).toBeInTheDocument();
      expect(screen.getByAltText(article.image?.alt ?? '')).toBeInTheDocument();
    }
  });

  it('renders the FAQ support route heading', () => {
    render(<FaqPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'FAQ' })).toBeInTheDocument();
    expect(screen.getByText('자주 묻는 질문')).toBeInTheDocument();
  });
});
