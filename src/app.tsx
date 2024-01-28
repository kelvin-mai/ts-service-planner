import { RootProvider } from '@/context/root-provider';
import { useNprogress } from '@/hooks';

export const App = () => {
  useNprogress();

  return (
    <RootProvider>
      <h1>Hello world</h1>
    </RootProvider>
  );
};
