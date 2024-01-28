import { RootProvider } from '@/context/root-provider';
import { RouterProvider, createRouter } from '@tanstack/react-router';

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
    </RootProvider>
  );
};
