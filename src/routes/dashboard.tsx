import { Outlet, RouteObject } from 'react-router-dom';

import { DashboardLayout } from '@/components/layouts';

export const dashbaordRoutes: RouteObject = {
  path: '/',
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [{ path: 'account', lazy: () => import('@/pages/account') }],
};
