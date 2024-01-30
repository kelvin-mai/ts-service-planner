import { useParams, json } from 'react-router';
import { Box, Stack, TableContainer, Typography } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';

import { Breadcrumbs, type BreadcrumbLink } from '@/components/common';
import { PostForm } from '@/components/blog';
import { Post, deletePost, fetchPost, updatePost } from '@/api/post';
import { apiClient } from '@/api';

export const Component = () => {
  const { id } = useParams();
  const { data, isPending, isError } = useQuery<{ post: Post }>({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id!),
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updatePost(id!, data),
    onSuccess: () => apiClient.invalidateQueries({ queryKey: ['posts', id] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id!),
    onSuccess: () => apiClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  if (isError) {
    throw json({}, { status: 404 });
  }
  const { post } = data!;

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return isPending ? (
    <></>
  ) : (
    <Box
      component='main'
      sx={{ flexGrow: 1, py: 8 }}
    >
      <TableContainer>
        <Stack spacing={1}>
          <Typography variant='h3'>Update this Post</Typography>
          <Breadcrumbs
            links={breadcrumbs}
            current={post.title}
          />
        </Stack>
        <PostForm
          mode='edit'
          post={post}
          onSubmit={updateMutation.mutate}
          onDelete={deleteMutation.mutate}
        />
      </TableContainer>
    </Box>
  );
};
