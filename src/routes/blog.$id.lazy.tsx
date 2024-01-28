import { BlogPage } from '@/pages/blog';
import { ErrorPage } from '@/pages/error';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/blog/$id')({
  component: BlogPage,
  errorComponent: () => <ErrorPage />,
});
