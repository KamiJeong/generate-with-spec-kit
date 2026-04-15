import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '@sfood/App';

function renderFaq() {
  window.history.pushState({}, '', '/support/faq');
  return render(<App />);
}

describe('US6 FAQ support', () => {
  it('renders required FAQ categories', () => {
    renderFaq();

    for (const category of ['브랜드', '제품', '품질', '구매/제휴', '채용']) {
      expect(screen.getAllByText(category).length).toBeGreaterThan(0);
    }
  });

  it('allows keyboard users to open an FAQ answer', async () => {
    const user = userEvent.setup();
    renderFaq();

    const trigger = screen.getByRole('button', {
      name: /SFood는 어떤 브랜드인가요/,
    });
    trigger.focus();
    await user.keyboard('{Enter}');

    expect(screen.getAllByText(/프리미엄 육가공 전문성/).length).toBeGreaterThan(0);
  });
});
