import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@sfood/App';

function renderTalent() {
  window.history.pushState({}, '', '/talent');
  return render(<App />);
}

describe('US5 talent and hiring process', () => {
  it('shows talent values and ordered hiring steps', () => {
    renderTalent();

    expect(screen.getByText('맛을 끝까지 탐구하는 사람')).toBeInTheDocument();
    expect(screen.getByText('품질 앞에서 정직한 사람')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('지원서 접수')).toBeInTheDocument();
    expect(screen.getByText('최종 안내')).toBeInTheDocument();
  });

  it('does not render an application form or personal information fields', () => {
    renderTalent();

    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/이름|전화|이메일/)).not.toBeInTheDocument();
  });
});
