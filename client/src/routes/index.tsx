import { Outlet, createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@/pages/error';

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
        path: '/blog',
        lazy: () => import('@/pages/blog/index'),
      },
      {
        path: '/blog/new',
        lazy: () => import('@/pages/blog/create'),
      },
      {
        path: '/blog/:id',
        lazy: () => import('@/pages/blog/details'),
      },
      {
        path: '/blog/:id/edit',
        lazy: () => import('@/pages/blog/update'),
      },
    ],
  },
]);
