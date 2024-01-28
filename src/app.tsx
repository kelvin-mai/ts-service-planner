import { RouterProvider, createRouter } from '@tanstack/react-router';

import { RootProvider } from '@/context/root-provider';
import { Toaster } from '@/components/common';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <RootProvider>
      <RouterProvider router={router} />
      <Toaster />
    </RootProvider>
  );
};
