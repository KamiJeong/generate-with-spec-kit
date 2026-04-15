import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@sfood/App';

const forbiddenQualityTerms = ['FSSC 22000', 'HACCP', 'DLG'] as const;

function renderAbout() {
  window.history.pushState({}, '', '/about');
  return render(<App />);
}

describe('US2 company identity and trust', () => {
  it('shows mission, business domains, and generic quality language', () => {
    renderAbout();

    expect(
      screen.getByRole('heading', { level: 1, name: '좋은 식품의 기준을 새롭게 만듭니다' })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/B2B와 B2C/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/육가공 및 Meal Solution/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/품질 중심 운영/).length).toBeGreaterThan(0);
  });

  it('does not render exact certification or award names', () => {
    const { container } = renderAbout();
    const text = container.textContent ?? '';

    for (const term of forbiddenQualityTerms) {
      expect(text).not.toContain(term);
    }
  });
});
