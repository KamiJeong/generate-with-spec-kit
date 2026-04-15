import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { DashboardPage } from '@wiki/pages/DashboardPage';
import { renderWithProviders } from './test-utils';

describe('DashboardPage', () => {
  it('renders project monitoring summary and blocked state', () => {
    renderWithProviders(<DashboardPage />);
    expect(screen.getByText('전체 프로젝트')).toBeInTheDocument();
    expect(screen.getAllByText('AI Wiki Portal 파일럿').length).toBeGreaterThan(0);
    expect(screen.getByText('막힘 상태')).toBeInTheDocument();
  });

  it('shows simulated refresh feedback', async () => {
    renderWithProviders(<DashboardPage />);
    await userEvent.click(screen.getByRole('button', { name: '수동 새로고침' }));
    expect(screen.getByText('mock 데이터가 갱신되었습니다.')).toBeInTheDocument();
  });
});
