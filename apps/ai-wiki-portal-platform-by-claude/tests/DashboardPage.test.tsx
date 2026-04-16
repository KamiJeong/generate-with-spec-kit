import { SidebarProvider } from '@kamijeong/ui';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { DashboardPage } from '../src/pages/DashboardPage';

function renderPage(ui: React.ReactElement) {
  return render(
    <SidebarProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </SidebarProvider>,
  );
}

describe('DashboardPage', () => {
  it('renders the greeting with the current user name', () => {
    renderPage(<DashboardPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('김민준님');
  });

  it('renders stats summary cards', () => {
    renderPage(<DashboardPage />);
    expect(screen.getByText('전체 프로젝트')).toBeInTheDocument();
    expect(screen.getAllByText('진행 중').length).toBeGreaterThan(0);
    expect(screen.getAllByText('완료').length).toBeGreaterThan(0);
  });

  it('shows my projects section', () => {
    renderPage(<DashboardPage />);
    expect(screen.getByText('내 프로젝트')).toBeInTheDocument();
  });

  it('renders project cards for current user', () => {
    renderPage(<DashboardPage />);
    expect(screen.getByText('사내 HR 셀프서비스 포털')).toBeInTheDocument();
    expect(screen.getByText('재고 관리 대시보드')).toBeInTheDocument();
  });

  it('renders activity feed', () => {
    renderPage(<DashboardPage />);
    expect(screen.getByText('최근 활동')).toBeInTheDocument();
  });
});
