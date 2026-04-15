import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { SiteHeader } from '@sfood/components/layout/SiteHeader';

describe('SiteHeader', () => {
  it('SFood 로고를 렌더링한다', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );
    expect(screen.getByText('SFood')).toBeInTheDocument();
  });

  it('주요 내비게이션 링크를 표시한다', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );
    expect(screen.getAllByText('홈').length).toBeGreaterThan(0);
    expect(screen.getAllByText('회사소개').length).toBeGreaterThan(0);
    expect(screen.getAllByText('브랜드').length).toBeGreaterThan(0);
  });

  it('모바일 햄버거 버튼을 표시한다', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('메뉴 열기')).toBeInTheDocument();
  });
});
