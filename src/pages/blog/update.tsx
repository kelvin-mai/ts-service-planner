import { useParams, json } from 'react-router';
import { Stack, Typography } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';

import { Breadcrumbs, type BreadcrumbLink, Seo } from '@/components/common';
import { PostForm } from '@/components/blog';
import { type Post, type PostDTO, deletePost, fetchPost, updatePost } from '@/api/post';
import { apiClient } from '@/api';

export const Component = () => {
  const { id } = useParams();
  const { data, isPending, isError } = useQuery<{ post: Post }>({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id!),
  });

  const updateMutation = useMutation({
    mutationFn: (data: PostDTO) => updatePost(id!, data),
    onSuccess: () => apiClient.invalidateQueries({ queryKey: ['posts', id] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id!),
    onSuccess: () => apiClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  if (isError) {
    throw json({}, { status: 404 });
  }

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
    <>
      <Seo title='Update this Post' />
      <Stack spacing={1}>
        <Typography variant='h3'>Update this Post</Typography>
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
    </>
  );
};
