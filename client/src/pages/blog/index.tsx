import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Unstable_Grid2 as Grid,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { ArrowLeft, ArrowRight } from '@untitled-ui/icons-react';
import { useQuery } from '@tanstack/react-query';

import { RouterLink, Seo, Breadcrumbs, type BreadcrumbLink } from '@/components/common';
import { PostCard, PostNewsletter } from '@/components/blog';
import { Post, fetchPosts } from '@/api/post';
import { json } from 'react-router';

export const Component = () => {
  const { data, isPending, isError } = useQuery<{ posts: Post[] }>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  const breadcrumbs: BreadcrumbLink[] = [{ href: '/', title: 'Home' }];
  if (isError) {
    throw json({}, { status: 500 });
  }
  return (
    <>
      <Seo title='Blog: Post List' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={1}>
            <Typography variant='h3'>Blog</Typography>
            <Breadcrumbs
              links={breadcrumbs}
              current='Blog'
            />
          </Stack>
          <Card
            elevation={16}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              mb: 8,
              mt: 6,
              px: 3,
              py: 2,
            }}
          >
            <Typography variant='subtitle1'>Hello, Admin</Typography>
            <Button
              component={RouterLink}
              href='/blog/new'
              variant='contained'
            >
              New Post
            </Button>
          </Card>
          <Typography variant='h4'>Recent Articles</Typography>
          <Typography
            color='text.secondary'
            sx={{ mt: 2 }}
            variant='body1'
          >
            Discover the latest news, tips and user research insights from Acme.
          </Typography>
          <Typography
            color='text.secondary'
            variant='body1'
          >
            You will learn about web infrastructure, design systems and devops APIs best practices.
          </Typography>
          <Divider sx={{ my: 4 }} />
          <Grid
            container
            spacing={4}
          >
            {!isPending &&
              data!.posts.map((post) => (
                <Grid
                  key={post.id}
                  xs={12}
                  md={6}
                >
                  <PostCard
                    id={post.id}
                    // authorAvatar={post.author.avatar}
                    // authorName={post.author.name}
                    category={post.category}
                    cover={post.cover}
                    // publishedAt={post.publishedAt}
                    readTime={post.readTime}
                    shortDescription={post.description}
                    title={post.title}
                    sx={{ height: '100%' }}
                  />
                </Grid>
              ))}
          </Grid>
          <Stack
            alignItems='center'
            direction='row'
            justifyContent='center'
            spacing={1}
            sx={{
              mt: 4,
              mb: 8,
            }}
          >
            <Button
              disabled
              startIcon={
                <SvgIcon>
                  <ArrowLeft />
                </SvgIcon>
              }
            >
              Newer
            </Button>
            <Button
              endIcon={
                <SvgIcon>
                  <ArrowRight />
                </SvgIcon>
              }
            >
              Older posts
            </Button>
          </Stack>
          <Box sx={{ mt: 8 }}>
            <PostNewsletter />
          </Box>
        </Container>
      </Box>
    </>
  );
};
