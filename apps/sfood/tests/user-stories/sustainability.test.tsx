import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@sfood/App';

function renderSustainability() {
  window.history.pushState({}, '', '/sustainability');
  return render(<App />);
}

describe('US3 sustainability direction', () => {
  it('renders at least three sustainability themes and mission continuity', () => {
    renderSustainability();

    expect(
      screen.getByRole('heading', { level: 1, name: '미래를 위한 맛있는 책임' })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/더 좋은 식품으로 더 좋은 세상/).length).toBeGreaterThan(0);

    for (const theme of ['책임 있는 원료', '효율적인 생산', '함께 나누는 식문화']) {
      expect(screen.getAllByText(theme).length).toBeGreaterThan(0);
    }
  });
});
