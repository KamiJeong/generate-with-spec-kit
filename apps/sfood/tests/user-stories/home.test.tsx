import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@sfood/App';

function renderHome() {
  window.history.pushState({}, '', '/');
  return render(<App />);
}

describe('US1 home brand understanding', () => {
  it('communicates mission, expertise, meal solution, and business structure', () => {
    renderHome();

    expect(
      screen.getByRole('heading', { level: 1, name: '더 좋은 식품으로 더 좋은 세상' })
    ).toBeInTheDocument();
    expect(screen.getByText(/프리미엄 육가공/)).toBeInTheDocument();
    expect(screen.getAllByText(/Meal Solution/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/B2B/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/B2C/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/품질 신뢰/).length).toBeGreaterThan(0);
  });

  it('offers primary navigation to the requested page destinations', () => {
    renderHome();

    for (const label of ['회사소개', '지속 가능성', '브랜드', '인재 채용', '고객지원']) {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
    }
  });
});
