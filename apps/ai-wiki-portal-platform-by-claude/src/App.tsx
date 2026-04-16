import { SidebarInset, SidebarProvider } from '@kamijeong/ui';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AppSidebar } from '@wiki/components/layout/AppSidebar';
import { LoadingSpinner } from '@wiki/components/shared/LoadingSpinner';
import { ROUTES } from '@wiki/routes';

const DashboardPage = lazy(() =>
  import('@wiki/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const WikiPage = lazy(() =>
  import('@wiki/pages/WikiPage').then((m) => ({ default: m.WikiPage })),
);
const WikiDocPage = lazy(() =>
  import('@wiki/pages/WikiDocPage').then((m) => ({ default: m.WikiDocPage })),
);
const BlueprintPage = lazy(() =>
  import('@wiki/pages/BlueprintPage').then((m) => ({ default: m.BlueprintPage })),
);
const GetStartedPage = lazy(() =>
  import('@wiki/pages/GetStartedPage').then((m) => ({ default: m.GetStartedPage })),
);
const ProjectDetailPage = lazy(() =>
  import('@wiki/pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })),
);

function AppLayout() {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-svh bg-background text-foreground">
          <Suspense fallback={<LoadingSpinner label="페이지 로딩 중..." />}>
            <Outlet />
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.WIKI, element: <WikiPage /> },
      { path: ROUTES.WIKI_DOC, element: <WikiDocPage /> },
      { path: ROUTES.BLUEPRINT, element: <BlueprintPage /> },
      { path: ROUTES.GET_STARTED, element: <GetStartedPage /> },
      { path: ROUTES.PROJECT_DETAIL, element: <ProjectDetailPage /> },
    ],
  },
]);
