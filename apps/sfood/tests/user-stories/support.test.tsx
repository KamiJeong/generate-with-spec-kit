import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@sfood/App';

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('US6 support notice and news', () => {
  it('renders notice list entries without detail links', () => {
    renderAt('/support/notice');

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(3);
    expect(screen.queryByText('자세히 보기')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /상세/ })).not.toBeInTheDocument();
  });

  it('renders news list entries without detail links', () => {
    renderAt('/support/news');

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(3);
    expect(screen.queryByText('자세히 보기')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /상세/ })).not.toBeInTheDocument();
  });

  it('provides support navigation between support pages', () => {
    renderAt('/support/notice');

    const nav = screen.getByRole('navigation', { name: '지원 메뉴' });
    for (const label of ['공지사항', '회사소식', 'FAQ']) {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument();
    }
  });
});
