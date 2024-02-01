import { Outlet, createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@/pages/error';
import { BlogLayout } from '@/components/blog';

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: () => <>Hello World</>,
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
  },
]);
