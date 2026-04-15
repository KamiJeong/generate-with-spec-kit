import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StepList } from '../src/components/get-started/StepList';
import { mockSteps } from '../src/mock/steps';

describe('StepList', () => {
  it('renders step descriptions', () => {
    render(
      <StepList steps={mockSteps} completedIds={new Set()} onToggle={() => {}} />,
    );
    // Check description text (not split across elements)
    expect(
      screen.getByText(/AI Wiki Portal에 접속하여 계정을 확인/),
    ).toBeInTheDocument();
  });

  it('calls onToggle when a step checkbox is clicked', async () => {
    const onToggle = vi.fn();
    render(
      <StepList steps={mockSteps.slice(0, 1)} completedIds={new Set()} onToggle={onToggle} />,
    );
    await userEvent.click(screen.getByRole('button', { name: /완료 처리/ }));
    expect(onToggle).toHaveBeenCalledWith(mockSteps[0].id);
  });

  it('shows AI help panel when "AI에게 질문" is clicked', async () => {
    render(
      <StepList steps={mockSteps.slice(0, 1)} completedIds={new Set()} onToggle={() => {}} />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'AI에게 질문' }));
    expect(screen.getByText('AI 도움말')).toBeInTheDocument();
  });
});
