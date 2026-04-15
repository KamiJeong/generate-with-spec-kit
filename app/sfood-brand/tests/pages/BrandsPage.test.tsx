import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { BrandsPage } from '@sfood/pages/BrandsPage';

describe('BrandsPage', () => {
  it('4개 브랜드명을 모두 렌더링한다', () => {
    render(
      <MemoryRouter>
        <BrandsPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText('존쿡 델리미트').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SFood 홈그릴').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SFood 프로').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SFood 캐터링').length).toBeGreaterThan(0);
  });

  it('B2C 브랜드 섹션 헤더를 표시한다', () => {
    render(
      <MemoryRouter>
        <BrandsPage />
      </MemoryRouter>
    );
    expect(screen.getByText('B2C 브랜드')).toBeInTheDocument();
  });

  it('B2B 브랜드 섹션 헤더를 표시한다', () => {
    render(
      <MemoryRouter>
        <BrandsPage />
      </MemoryRouter>
    );
    expect(screen.getByText('B2B 브랜드')).toBeInTheDocument();
  });
});
