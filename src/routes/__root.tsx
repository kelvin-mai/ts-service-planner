import { useNprogress } from '@/hooks';
import { ErrorPage } from '@/pages/error';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => {
    useNprogress();
    return (
      <>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link
            to='/'
            className='[&.active]:font-bold'
          >
            Home
          </Link>
          <Link
            to='/pricing'
            className='[&.active]:font-bold'
          >
            Pricing
          </Link>
          <Link
            to='/blog'
            className='[&.active]:font-bold'
          >
            Blog
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
  errorComponent: () => <ErrorPage code={404} />,
});
