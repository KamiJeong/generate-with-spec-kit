import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { WikiPage } from '@wiki/pages/WikiPage';
import { renderWithProviders } from './test-utils';

describe('WikiPage', () => {
  it('renders category exploration and document cards', () => {
    renderWithProviders(<WikiPage />);
    expect(screen.getByRole('heading', { name: 'Wiki 문서' })).toBeInTheDocument();
    expect(screen.getAllByText('Blueprint 작성 방법').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AI Agent 활용 가이드').length).toBeGreaterThan(0);
  });

  it('filters documents by keyword and shows no-results recovery', async () => {
    renderWithProviders(<WikiPage />);
    await userEvent.type(screen.getByPlaceholderText('Blueprint, GitHub, 오류 등'), 'zzzz');
    expect(screen.getByText('검색 결과가 없습니다')).toBeInTheDocument();
    await userEvent.clear(screen.getByPlaceholderText('Blueprint, GitHub, 오류 등'));
    await userEvent.type(screen.getByPlaceholderText('Blueprint, GitHub, 오류 등'), 'GitHub');
    expect(screen.getByText('GitHub 프로젝트 관리')).toBeInTheDocument();
  });
});
