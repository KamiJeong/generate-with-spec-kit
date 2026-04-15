import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@sfood/App';

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('SFood accessibility structure', () => {
  it('renders shared landmarks on every page', () => {
    renderAt('/brands');

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('marks the active primary navigation item', () => {
    renderAt('/brands');

    const nav = screen.getByRole('navigation', { name: '주요 메뉴' });
    expect(within(nav).getByRole('link', { current: 'page' })).toHaveTextContent(
      '브랜드'
    );
  });

  it('marks the active support navigation item', () => {
    renderAt('/support/news');

    const nav = screen.getByRole('navigation', { name: '지원 메뉴' });
    expect(within(nav).getByRole('link', { current: 'page' })).toHaveTextContent(
      '회사소식'
    );
  });

  it('renders a useful fallback for unknown routes', () => {
    renderAt('/missing');

    expect(
      screen.getByRole('heading', { level: 1, name: '페이지를 찾을 수 없습니다' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '메인으로 돌아가기' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
