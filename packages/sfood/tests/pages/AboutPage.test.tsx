import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AboutPage } from '@sfood/pages/AboutPage';
import { certifications, companyTimeline } from '@sfood/content/sfood-content';

describe('AboutPage', () => {
  it('renders mission, vision, values, timeline, and certifications', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1, name: '회사소개' })).toBeInTheDocument();
    expect(screen.getByText(/더 좋은 식품으로 더 좋은 세상을 만든다/)).toBeInTheDocument();
    expect(screen.getByText('비전')).toBeInTheDocument();
    expect(screen.getByText('핵심 가치')).toBeInTheDocument();
    for (const item of companyTimeline) {
      expect(screen.getByText(item.year)).toBeInTheDocument();
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
    for (const certification of certifications) {
      expect(screen.getByText(certification.name)).toBeInTheDocument();
    }
  });
});
