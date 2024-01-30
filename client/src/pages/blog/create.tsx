import { Box, Container, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { Breadcrumbs, type BreadcrumbLink } from '@/components/common';
import { PostForm } from '@/components/blog';
import { createPost } from '@/api/post';
import { apiClient } from '@/api';

export const Component = () => {
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => apiClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
    <Box
      component='main'
      sx={{ flexGrow: 1, py: 8 }}
    >
      <Container>
        <Stack spacing={1}>
          <Typography variant='h3'>Create a new Post</Typography>
          <Breadcrumbs
            links={breadcrumbs}
            current='New'
          />
        </Stack>
        <PostForm
          mode='create'
          onSubmit={mutation.mutate}
        />
      </Container>
    </Box>
  );
};
