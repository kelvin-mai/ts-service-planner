import { useParams, json } from 'react-router';
import { Stack, Typography } from '@mui/material';

import { Breadcrumbs, type BreadcrumbLink, Seo } from '@/components/common';
import { PostForm } from '@/components/blog';
import { AuthGuard } from '@/components/auth';
import { usePostsApi } from '@/api/hooks';

export const Component = () => {
  const { id } = useParams();
  if (!id) {
    throw json({}, { status: 404 });
  }

  const { getPostQuery, getUpdateMutation, getDeleteMutation } = usePostsApi();
  const { data, isPending, isError } = getPostQuery(id);
  // data?.post.author.id
  const updateMutation = getUpdateMutation(id);
  const deleteMutation = getDeleteMutation(id);

  if (isError) {
    throw json({}, { status: 404 });
  }

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
    <AuthGuard
      authorized
      authorizeId={data?.post.author.id}
    >
      <Seo title='Update this Post' />
      <Stack spacing={1}>
        <Typography variant='h2'>Update this Post</Typography>
        <Breadcrumbs
          links={breadcrumbs}
          current={data?.post.title || 'This Post'}
        />
      </Stack>
      <PostForm
        mode='edit'
        post={data?.post}
        onSubmit={updateMutation.mutate}
        onDelete={deleteMutation.mutate}
        disabled={isPending}
      />
    </AuthGuard>
  );
};
