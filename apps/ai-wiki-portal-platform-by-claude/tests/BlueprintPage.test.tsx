import { SidebarProvider } from '@myorg/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { BlueprintPage } from '../src/pages/BlueprintPage';

function renderPage(ui: React.ReactElement) {
  return render(
    <SidebarProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </SidebarProvider>,
  );
}

describe('BlueprintPage', () => {
  it('renders the blueprint generation form', () => {
    renderPage(<BlueprintPage />);
    expect(screen.getByLabelText('서비스 요구사항을 자연어로 입력하세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Blueprint 생성' })).toBeInTheDocument();
  });

  it('button is disabled when input is empty', () => {
    renderPage(<BlueprintPage />);
    expect(screen.getByRole('button', { name: 'Blueprint 생성' })).toBeDisabled();
  });

  it('button is enabled after typing', async () => {
    renderPage(<BlueprintPage />);
    const textarea = screen.getByLabelText('서비스 요구사항을 자연어로 입력하세요');
    await userEvent.type(textarea, '테스트 요구사항');
    expect(screen.getByRole('button', { name: 'Blueprint 생성' })).toBeEnabled();
  });
});
