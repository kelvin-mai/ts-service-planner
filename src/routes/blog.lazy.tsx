import { createLazyFileRoute } from '@tanstack/react-router';

import { BlogsPage } from '@/pages/blogs';

export const Route = createLazyFileRoute('/blog')({
  component: BlogsPage,
});
