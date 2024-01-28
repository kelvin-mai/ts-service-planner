import { useNprogress } from '@/hooks';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => {
    useNprogress();
    return (
      <>
        <Link
          to='/'
          className='[&.active]:font-bold'
        >
          Home
        </Link>{' '}
        <Link
          to='/pricing'
          className='[&.active]:font-bold'
        >
          Pricing
        </Link>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
