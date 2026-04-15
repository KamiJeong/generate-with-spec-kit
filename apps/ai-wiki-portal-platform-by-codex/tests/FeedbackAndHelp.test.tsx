import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { AiQueryPanel } from '@wiki/components/project/AiQueryPanel';
import { FeedbackEntry } from '@wiki/components/shared/FeedbackEntry';
import { renderWithProviders } from './test-utils';

describe('Feedback and help', () => {
  it('preserves AI question context', () => {
    renderWithProviders(<AiQueryPanel sourceLabel="오류 상황 문제 해결" context="환경 구성 단계 오류" />);
    expect(screen.getByText('출처: 오류 상황 문제 해결')).toBeInTheDocument();
    expect(screen.getByText('환경 구성 단계 오류')).toBeInTheDocument();
  });

  it('validates empty feedback description', async () => {
    renderWithProviders(<FeedbackEntry sourceLabel="Blueprint 작성 방법" />);
    await userEvent.click(screen.getByRole('button', { name: '피드백 제출' }));
    expect(screen.getByText('개선 의견을 입력하세요.')).toBeInTheDocument();
  });
});
