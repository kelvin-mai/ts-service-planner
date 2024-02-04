import { json } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import {
  Button,
  Divider,
  Unstable_Grid2 as Grid,
  Skeleton,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { ArrowLeft, ArrowRight } from '@untitled-ui/icons-react';
import { useQuery } from '@tanstack/react-query';

import { RouterLink, Seo, Breadcrumbs, type BreadcrumbLink } from '@/components/common';
import { BlogActions, PostCard } from '@/components/blog';
import { fetchPosts } from '@/api/post';

const PendingSkeleton = () => (
  <Grid
    xs={12}
    md={6}
  >
    <Skeleton
      component='div'
      height={400}
    />
  </Grid>
);

export const Component = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam) : 1;
  const { data, isPending, isError } = useQuery<{ posts: any[]; hasNext: boolean }>({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
  });
  const breadcrumbs: BreadcrumbLink[] = [{ href: '/', title: 'Home' }];
  if (isError) {
    throw json({}, { status: 500 });
  }
  const setPage = (direction: 'next' | 'prev') => {
    if (page) {
      if (direction === 'next') {
        setSearchParams(createSearchParams({ page: (page + 1).toString() }));
      } else if (direction === 'prev') {
        setSearchParams(createSearchParams({ page: (page - 1).toString() }));
      }
    } else {
      setSearchParams(createSearchParams({ page: '2' }));
    }
  };

  return (
    <>
      <Seo title='Blog' />
      <Stack spacing={1}>
        <Typography variant='h3'>Blog</Typography>
        <Breadcrumbs
          links={breadcrumbs}
          current='Blog'
        />
      </Stack>
      <BlogActions>
        <Button
          component={RouterLink}
          href='/blog/new'
          variant='contained'
        >
          New Post
        </Button>
      </BlogActions>
      <Typography
        variant='h4'
        sx={{ mt: 6 }}
      >
        Recent Articles
      </Typography>
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
        {isPending ? (
          <>
            <PendingSkeleton />
            <PendingSkeleton />
          </>
        ) : (
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
                // publishedAt={post.publishedAt}
                readTime={post.readTime}
                shortDescription={post.description}
                title={post.title}
                sx={{ height: '100%' }}
              />
            </Grid>
          ))
        )}
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
          disabled={isPending || page === 1}
          startIcon={
            <SvgIcon>
              <ArrowLeft />
            </SvgIcon>
          }
          onClick={() => setPage('prev')}
        >
          Newer
        </Button>
        <Button
          disabled={isPending || !data.hasNext}
          endIcon={
            <SvgIcon>
              <ArrowRight />
            </SvgIcon>
          }
          onClick={() => setPage('next')}
        >
          Older posts
        </Button>
      </Stack>
    </>
  );
};
