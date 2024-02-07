import { Outlet, RouteObject } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts';

export const authRoutes: RouteObject = {
  path: '/auth/',
  element: (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
  children: [
    { path: 'login', lazy: () => import('@/pages/auth/login') },
    { path: 'register', lazy: () => import('@/pages/auth/register') },
    { path: 'forgot-password', lazy: () => import('@/pages/auth/forgot-password') },
    { path: 'update-password', lazy: () => import('@/pages/auth/update-password') },
  ],
};
