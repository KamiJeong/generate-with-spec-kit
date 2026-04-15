import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RolePerspectiveProvider } from '@wiki/lib/role-context';

const routerFuture = {
  v7_relativeSplatPath: true,
  v7_startTransition: true,
} as const;

export function renderWithProviders(ui: ReactElement, initialEntries = ['/']) {
  return render(
    <RolePerspectiveProvider>
      <MemoryRouter initialEntries={initialEntries} future={routerFuture}>
        {ui}
      </MemoryRouter>
    </RolePerspectiveProvider>,
  );
}

export function renderRoute({
  path,
  route,
  element,
}: {
  path: string;
  route: string;
  element: ReactElement;
}) {
  return render(
    <RolePerspectiveProvider>
      <MemoryRouter initialEntries={[route]} future={routerFuture}>
        <Routes>
          <Route path={path} element={element} />
        </Routes>
      </MemoryRouter>
    </RolePerspectiveProvider>,
  );
}
