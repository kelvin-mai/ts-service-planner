import { createLazyFileRoute } from '@tanstack/react-router';

import { BlogPage } from '@/pages/blog';

export const Route = createLazyFileRoute('/blog')({
  component: BlogPage,
});
