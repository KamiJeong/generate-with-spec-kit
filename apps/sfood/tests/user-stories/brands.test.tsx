import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@sfood/App';

function renderBrands() {
  window.history.pushState({}, '', '/brands');
  return render(<App />);
}

describe('US4 brand and product portfolio', () => {
  it('distinguishes consumer and business brand lines', () => {
    renderBrands();

    expect(screen.getByText('Consumer Brand')).toBeInTheDocument();
    expect(screen.getByText('Business Solution')).toBeInTheDocument();
  });

  it('shows required product categories', () => {
    renderBrands();

    for (const category of ['햄', '소시지', '베이컨', '바비큐', '치즈', '빵', '소스', 'HMR']) {
      expect(screen.getAllByText(category).length).toBeGreaterThan(0);
    }
  });
});
