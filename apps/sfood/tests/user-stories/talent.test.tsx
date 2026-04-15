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

    expect(screen.getAllByText('맛을 끝까지 탐구하는 사람').length).toBeGreaterThan(0);
    expect(screen.getAllByText('품질 앞에서 정직한 사람').length).toBeGreaterThan(0);
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('지원서 접수').length).toBeGreaterThan(0);
    expect(screen.getAllByText('최종 안내').length).toBeGreaterThan(0);
  });

  it('does not render an application form or personal information fields', () => {
    renderTalent();

    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/이름|전화|이메일/)).not.toBeInTheDocument();
  });
});
