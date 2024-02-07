import { Outlet, RouteObject } from 'react-router-dom';

import { HomePage } from '@/pages/home';

import { PublicLayout } from '@/components/layouts';
import { BlogLayout } from '@/components/blog';

export const publicRoutes: RouteObject = {
  element: (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  ),
  children: [
    {
      index: true,
      Component: HomePage,
    },
    {
      path: '/pricing',
      lazy: () => import('@/pages/pricing'),
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
};
