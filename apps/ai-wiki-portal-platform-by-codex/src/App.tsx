import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@wiki/components/layout/AppLayout';
import { LoadingState } from '@wiki/components/shared/StateFeedback';
import { ROUTES } from '@wiki/routes';

const DashboardPage = lazy(() =>
  import('@wiki/pages/DashboardPage').then((module) => ({ default: module.DashboardPage })),
);
const WikiPage = lazy(() =>
  import('@wiki/pages/WikiPage').then((module) => ({ default: module.WikiPage })),
);
const WikiDocPage = lazy(() =>
  import('@wiki/pages/WikiDocPage').then((module) => ({ default: module.WikiDocPage })),
);
const BlueprintPage = lazy(() =>
  import('@wiki/pages/BlueprintPage').then((module) => ({ default: module.BlueprintPage })),
);
const GetStartedPage = lazy(() =>
  import('@wiki/pages/GetStartedPage').then((module) => ({ default: module.GetStartedPage })),
);
const ProjectDetailPage = lazy(() =>
  import('@wiki/pages/ProjectDetailPage').then((module) => ({
    default: module.ProjectDetailPage,
  })),
);

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<LoadingState label="페이지 로딩 중..." />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
      { path: 'dashboard', element: withSuspense(<DashboardPage />) },
      { path: 'wiki', element: withSuspense(<WikiPage />) },
      { path: 'wiki/:docId', element: withSuspense(<WikiDocPage />) },
      { path: 'blueprint', element: withSuspense(<BlueprintPage />) },
      { path: 'get-started', element: withSuspense(<GetStartedPage />) },
      { path: 'projects/:projectId', element: withSuspense(<ProjectDetailPage />) },
    ],
  },
]);
