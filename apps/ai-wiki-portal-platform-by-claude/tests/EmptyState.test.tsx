import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, expect, it } from 'vitest';
import { EmptyState } from '../src/components/shared/EmptyState';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="데이터가 없습니다" />);
    expect(screen.getByText('데이터가 없습니다')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<EmptyState title="없음" description="항목을 추가해 주세요." />);
    expect(screen.getByText('항목을 추가해 주세요.')).toBeInTheDocument();
  });

  it('renders action slot when provided', () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        title="없음"
        action={<button type="button" onClick={onClick}>추가하기</button>}
      />,
    );
    expect(screen.getByRole('button', { name: '추가하기' })).toBeInTheDocument();
  });

  it('calls action callback when action is clicked', async () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        title="없음"
        action={<button type="button" onClick={onClick}>추가하기</button>}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: '추가하기' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
