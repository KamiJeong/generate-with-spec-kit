import { SidebarProvider } from '@kamijeong/ui';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ProjectDetailPage } from '../src/pages/ProjectDetailPage';

function renderAtPath(path: string) {
  return render(
    <SidebarProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        </Routes>
      </MemoryRouter>
    </SidebarProvider>,
  );
}

describe('ProjectDetailPage', () => {
  it('renders project name in heading', () => {
    renderAtPath('/projects/proj-001');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('사내 HR 셀프서비스 포털');
  });

  it('renders participants section', () => {
    renderAtPath('/projects/proj-001');
    expect(screen.getByText(/참여 멤버/)).toBeInTheDocument();
    expect(screen.getByText('김민준')).toBeInTheDocument();
  });

  it('renders GitHub status for project with github data', () => {
    renderAtPath('/projects/proj-001');
    expect(screen.getByText('GitHub 현황')).toBeInTheDocument();
  });

  it('renders empty state for unknown project', () => {
    renderAtPath('/projects/proj-999');
    expect(screen.getByText('프로젝트를 찾을 수 없습니다')).toBeInTheDocument();
  });
});
