import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@/pages/error';

const HomePage = () => {
  return <>Hello World</>;
};

export const router = createBrowserRouter([
  {
    index: true,
    Component: HomePage,
  },
  {
    path: '/pricing',
    lazy: () => import('@/pages/pricing'),
  },
  {
    path: '/blog',
    lazy: () => import('@/pages/blogs'),
  },
  {
    path: '/blog/:id',
    lazy: () => import('@/pages/blog'),
  },
  {
    path: '/*',
    Component: ErrorPage,
  },
]);
