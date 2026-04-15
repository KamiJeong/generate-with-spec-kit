import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { BlueprintPage } from '@wiki/pages/BlueprintPage';
import { renderWithProviders } from './test-utils';

describe('BlueprintPage', () => {
  it('keeps generate disabled for empty input', () => {
    renderWithProviders(<BlueprintPage />);
    expect(screen.getByRole('button', { name: 'mock Blueprint 생성' })).toBeDisabled();
  });

  it('shows mock Blueprint result after valid input', async () => {
    renderWithProviders(<BlueprintPage />);
    await userEvent.type(
      screen.getByPlaceholderText(/영업팀이 고객 미팅 일정을 등록/),
      '고객 지원팀이 문의를 등록하고 상태를 확인하는 서비스를 만들고 싶습니다.',
    );
    await userEvent.click(screen.getByRole('button', { name: 'mock Blueprint 생성' }));
    expect(await screen.findByText('mock Blueprint 결과')).toBeInTheDocument();
    expect(screen.getByText('PRD')).toBeInTheDocument();
    expect(screen.getByText('다음 단계 준비 완료')).toBeInTheDocument();
  });
});
