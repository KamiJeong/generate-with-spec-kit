import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectDetailPage } from '@wiki/pages/ProjectDetailPage';
import { renderRoute } from './test-utils';

describe('ProjectDetailPage', () => {
  it('renders project detail, timeline, and GitHub status', () => {
    renderRoute({
      path: '/projects/:projectId',
      route: '/projects/project-inventory',
      element: <ProjectDetailPage />,
    });
    expect(screen.getByText('재고 관리 대시보드')).toBeInTheDocument();
    expect(screen.getByText('GitHub 및 지식 저장소 상태')).toBeInTheDocument();
    expect(screen.getAllByText('확인 실패').length).toBeGreaterThan(0);
    expect(screen.getByText('실행 단계')).toBeInTheDocument();
  });

  it('shows missing project recovery', () => {
    renderRoute({
      path: '/projects/:projectId',
      route: '/projects/missing',
      element: <ProjectDetailPage />,
    });
    expect(screen.getByText('프로젝트를 찾을 수 없습니다')).toBeInTheDocument();
  });
});
