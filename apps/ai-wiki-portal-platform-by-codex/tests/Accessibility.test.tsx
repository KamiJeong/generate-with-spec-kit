import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppLayout } from '@wiki/components/layout/AppLayout';
import { BlueprintPage } from '@wiki/pages/BlueprintPage';
import { renderRoute, renderWithProviders } from './test-utils';

describe('Accessibility smoke checks', () => {
  it('exposes role selector, navigation links, and primary actions by accessible name', () => {
    renderRoute({ path: '/', route: '/', element: <AppLayout /> });
    expect(screen.getByLabelText('역할 관점 선택')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Wiki 문서/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Blueprint 시작' })).toBeInTheDocument();
  });

  it('exposes Blueprint form controls by placeholder and button state', () => {
    renderWithProviders(<BlueprintPage />);
    expect(screen.getByPlaceholderText(/영업팀이 고객 미팅 일정을 등록/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'mock Blueprint 생성' })).toBeDisabled();
  });
});
