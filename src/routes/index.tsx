import { Outlet, createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@/pages/error';

import { publicRoutes } from './public';
import { authRoutes } from './auth';
import { dashbaordRoutes } from './dashboard';

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [publicRoutes, authRoutes, dashbaordRoutes],
  },
]);
