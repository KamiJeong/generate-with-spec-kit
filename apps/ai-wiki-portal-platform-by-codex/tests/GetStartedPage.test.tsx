import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GetStartedPage } from '@wiki/pages/GetStartedPage';
import { renderWithProviders } from './test-utils';

describe('GetStartedPage', () => {
  it('renders step status and blocked help path', () => {
    renderWithProviders(<GetStartedPage />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText(/개발 환경 준비/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '막힘 해결 문서 열기' })).toBeInTheDocument();
  });
});
