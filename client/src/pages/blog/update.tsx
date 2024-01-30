import { type LoaderFunction, useLoaderData } from 'react-router';
import { Box, Stack, TableContainer, Typography } from '@mui/material';

import { Breadcrumbs, type BreadcrumbLink } from '@/components/common';
import { PostForm } from '@/components/blog';
import { Post, fetchPost } from '@/api/post';

export const loader: LoaderFunction = async ({ params }) => {
  const { post } = await fetchPost(params.id as string);
  return post;
};

export const Component = () => {
  const post = useLoaderData() as Post;

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
    <Box
      component='main'
      sx={{ flexGrow: 1, py: 8 }}
    >
      <TableContainer>
        <Stack spacing={1}>
          <Typography variant='h3'>Create a new Post</Typography>
          <Breadcrumbs
            links={breadcrumbs}
            current={post.title}
          />
        </Stack>
        <PostForm
          mode='edit'
          post={post}
        />
      </TableContainer>
    </Box>
  );
};
