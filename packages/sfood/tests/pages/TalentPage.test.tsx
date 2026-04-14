import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TalentPage } from '@sfood/pages/TalentPage';
import { hiringSteps } from '@sfood/content/sfood-content';

describe('TalentPage', () => {
  it('renders culture, benefits, and four hiring steps', () => {
    render(<TalentPage />);

    expect(screen.getByRole('heading', { level: 1, name: '인재채용' })).toBeInTheDocument();
    expect(screen.getByText('채용 철학')).toBeInTheDocument();
    expect(screen.getByText('조직 문화')).toBeInTheDocument();
    expect(screen.getByText('복리후생')).toBeInTheDocument();
    expect(hiringSteps).toHaveLength(4);
    for (const step of hiringSteps) {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    }
  });
});
