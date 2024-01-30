import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@/components/common';
import { router } from './routes';

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};
