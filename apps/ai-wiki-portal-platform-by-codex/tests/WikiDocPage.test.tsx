import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WikiDocPage } from '@wiki/pages/WikiDocPage';
import { renderRoute } from './test-utils';

describe('WikiDocPage', () => {
  it('renders markdown content, related documents, and next action for a valid document', () => {
    renderRoute({ path: '/wiki/:docId', route: '/wiki/doc-blueprint', element: <WikiDocPage /> });
    expect(screen.getByRole('heading', { name: 'Blueprint 작성 방법' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '좋은 입력 예시' })).toBeInTheDocument();
    expect(screen.getByText('다음 행동')).toBeInTheDocument();
    expect(screen.getByText('개발 환경 구성 가이드')).toBeInTheDocument();
  });

  it('shows recovery for a missing document', () => {
    renderRoute({ path: '/wiki/:docId', route: '/wiki/doc-missing', element: <WikiDocPage /> });
    expect(screen.getByText('문서를 찾을 수 없습니다')).toBeInTheDocument();
  });
});
