import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SustainabilityPage } from '@sfood/pages/SustainabilityPage';
import { sustainabilityMetrics } from '@sfood/content/sfood-content';

describe('SustainabilityPage', () => {
  it('renders ESG sections and metric values', () => {
    render(<SustainabilityPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: '지속가능성' })
    ).toBeInTheDocument();
    expect(screen.getByText('환경 실천')).toBeInTheDocument();
    expect(screen.getByText('사회 공헌')).toBeInTheDocument();
    expect(screen.getByText('거버넌스')).toBeInTheDocument();
    for (const metric of sustainabilityMetrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
      expect(screen.getByText(`${metric.value}${metric.unit}`)).toBeInTheDocument();
    }
  });
});
