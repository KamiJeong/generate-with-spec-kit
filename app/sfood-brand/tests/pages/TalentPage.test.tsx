import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { TalentPage } from '@sfood/pages/TalentPage';

describe('TalentPage', () => {
  it('인재상 키워드 3개를 렌더링한다', () => {
    render(
      <MemoryRouter>
        <TalentPage />
      </MemoryRouter>
    );
    expect(screen.getByText('도전')).toBeInTheDocument();
    expect(screen.getByText('협업')).toBeInTheDocument();
    expect(screen.getByText('전문성')).toBeInTheDocument();
  });

  it('4단계 채용 프로세스를 렌더링한다', () => {
    render(
      <MemoryRouter>
        <TalentPage />
      </MemoryRouter>
    );
    expect(screen.getByText('서류 접수')).toBeInTheDocument();
    expect(screen.getByText('서류 심사')).toBeInTheDocument();
    expect(screen.getAllByText('면접').length).toBeGreaterThan(0);
    expect(screen.getByText('최종 합격')).toBeInTheDocument();
  });

  it('복리후생 항목을 4개 이상 표시한다', () => {
    render(
      <MemoryRouter>
        <TalentPage />
      </MemoryRouter>
    );
    expect(screen.getByText('유연 근무제')).toBeInTheDocument();
    expect(screen.getByText('자녀 교육 지원')).toBeInTheDocument();
    expect(screen.getByText('교육 훈련비 지원')).toBeInTheDocument();
    expect(screen.getByText('성과 인센티브')).toBeInTheDocument();
  });
});
