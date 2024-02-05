import { Stack, Typography } from '@mui/material';

import { Breadcrumbs, type BreadcrumbLink, Seo } from '@/components/common';
import { PostForm } from '@/components/blog';
import { AuthGuard } from '@/components/auth';
import { usePostsApi } from '@/api/hooks';

export const Component = () => {
  const { getCreateMutation } = usePostsApi();
  const createMutation = getCreateMutation();

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
    <AuthGuard>
      <Seo title='Create a new Post' />
      <Stack spacing={1}>
        <Typography variant='h2'>Create a new Post</Typography>
        <Breadcrumbs
          links={breadcrumbs}
          current='New'
        />
      </Stack>
      <PostForm
        mode='create'
        onSubmit={createMutation.mutate}
      />
    </AuthGuard>
  );
};
