import { Outlet, createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@/pages/error';

import { AuthLayout } from '@/components/auth';
import { BlogLayout } from '@/components/blog';

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <>Hello World</>,
      },
      {
        path: '/pricing',
        lazy: () => import('@/pages/pricing'),
      },
      {
        path: '/account',
        lazy: () => import('@/pages/account'),
      },
      {
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
        ],
      },
      {
        path: '/blog/',
        element: (
          <BlogLayout>
            <Outlet />
          </BlogLayout>
        ),
        children: [
          {
            path: '',
            lazy: () => import('@/pages/blog/index'),
          },
          {
            path: 'new',
            lazy: () => import('@/pages/blog/create'),
          },
          {
            path: ':id',
            lazy: () => import('@/pages/blog/details'),
          },
          {
            path: ':id/edit',
            lazy: () => import('@/pages/blog/update'),
          },
        ],
      },
    ],
  },
]);
