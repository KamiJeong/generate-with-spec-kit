import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from '@sfood/App';

describe('SFood App shell', () => {
  it('renders global header and footer around a known route', () => {
    window.history.pushState({}, '', '/about');

    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: '회사소개' })
    ).toBeInTheDocument();
  });

  it('renders the 404 fallback for an unknown route without losing layout', () => {
    window.history.pushState({}, '', '/unknown');

    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: '페이지를 찾을 수 없습니다' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '홈으로 이동' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
