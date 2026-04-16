import { SidebarProvider } from '@kamijeong/ui';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { WikiDocPage } from '../src/pages/WikiDocPage';
import { WikiPage } from '../src/pages/WikiPage';

function renderPage(ui: React.ReactElement, path = '/') {
  return render(
    <SidebarProvider>
      <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
    </SidebarProvider>,
  );
}

describe('WikiPage', () => {
  it('renders the wiki page title', () => {
    renderPage(<WikiPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wiki 문서');
  });

  it('shows empty state prompt', () => {
    renderPage(<WikiPage />);
    expect(screen.getByText('문서를 선택하세요')).toBeInTheDocument();
  });
});

describe('WikiDocPage', () => {
  it('renders document content for a valid doc id', () => {
    render(
      <SidebarProvider>
        <MemoryRouter initialEntries={['/wiki/doc-001']}>
          <Routes>
            <Route path="/wiki/:docId" element={<WikiDocPage />} />
          </Routes>
        </MemoryRouter>
      </SidebarProvider>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('플랫폼 소개');
  });

  it('shows empty state for unknown doc id', () => {
    render(
      <SidebarProvider>
        <MemoryRouter initialEntries={['/wiki/doc-999']}>
          <Routes>
            <Route path="/wiki/:docId" element={<WikiDocPage />} />
          </Routes>
        </MemoryRouter>
      </SidebarProvider>,
    );
    expect(screen.getByText('문서를 찾을 수 없습니다')).toBeInTheDocument();
  });
});
