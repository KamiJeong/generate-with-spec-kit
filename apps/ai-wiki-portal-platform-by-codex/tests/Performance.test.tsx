import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { WikiPage } from '@wiki/pages/WikiPage';
import { DashboardPage } from '@wiki/pages/DashboardPage';
import { renderWithProviders } from './test-utils';

describe('Performance smoke checks', () => {
  it('updates wiki search feedback within the interaction budget', async () => {
    renderWithProviders(<WikiPage />);
    const startedAt = performance.now();
    await userEvent.type(screen.getByPlaceholderText('Blueprint, GitHub, 오류 등'), 'GitHub');
    expect(screen.getByText('GitHub 프로젝트 관리')).toBeInTheDocument();
    expect(performance.now() - startedAt).toBeLessThan(2000);
  });

  it('updates simulated refresh state without waiting for network calls', async () => {
    renderWithProviders(<DashboardPage />);
    await userEvent.click(screen.getByRole('button', { name: '수동 새로고침' }));
    expect(screen.getByText('mock 데이터가 갱신되었습니다.')).toBeInTheDocument();
  });
});
