import { Outlet, RouteObject } from 'react-router-dom';

import { DashboardLayout } from '@/components/layouts';

export const dashbaordRoutes: RouteObject = {
  path: '/',
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    { path: 'account', lazy: () => import('@/pages/account') },
    { path: 'calendar', lazy: () => import('@/pages/calendar') },
    { path: 'dashboard', lazy: () => import('@/pages/dashboard') },
    { path: 'files', lazy: () => import('@/pages/files') },
    { path: 'people', lazy: () => import('@/pages/people') },
  ],
};
