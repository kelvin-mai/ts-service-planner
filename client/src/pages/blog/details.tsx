import { format, subHours } from 'date-fns';
import { Box, Button, Card, Chip, Container, Skeleton, Stack, Typography } from '@mui/material';
import { json, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { RouterLink, Seo, Breadcrumbs, type BreadcrumbLink } from '@/components/common';
import { PostContent } from '@/components/blog';
import { fetchPost, type Post } from '@/api/post';
import { getApiUrl } from '@/utils/url';

export const Component = () => {
  const { id } = useParams();
  const { data, isPending, isError } = useQuery<{ post: Post }>({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id!),
  });
  if (isError) {
    throw json({}, { status: 404 });
  }

  // const publishedAt = format(post.publishedAt, 'MMMM d, yyyy');

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
    <>
      <Seo title={data?.post.title || 'Post Details'} />
      <Stack spacing={1}>
        <Typography variant='h3'>Post</Typography>
        <Breadcrumbs
          links={breadcrumbs}
          current={data?.post.title || 'Post'}
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
          href={`/blog/${data?.post.id}/edit`}
          variant='contained'
          disabled={isPending}
        >
          Edit Post
        </Button>
      </Card>
      {isPending ? (
        <Stack spacing={3}>
          <Skeleton height={40} />
          <Skeleton height={25} />
          <Skeleton height={400} />
        </Stack>
      ) : (
        <>
          <Stack spacing={3}>
            <div>
              <Chip label={data.post.category} />
            </div>
            <Typography variant='h3'>{data.post.title}</Typography>
            <Typography
              color='text.secondary'
              variant='subtitle1'
            >
              {data.post.description}
            </Typography>
            <Stack
              alignItems='center'
              direction='row'
              spacing={2}
              sx={{ mt: 3 }}
            >
              {/* <Avatar src={post.author.avatar} /> */}
              <div>
                {/* <Typography variant='subtitle2'>
                  By {post.author.name} • {publishedAt}
                </Typography> */}
                <Typography
                  color='text.secondary'
                  variant='body2'
                >
                  {data.post.readTime} min read
                </Typography>
              </div>
            </Stack>
          </Stack>
          <Box
            component='img'
            src={`${getApiUrl()}/file/post-cover-${id}`}
            crossOrigin='anonymous'
            alt='cover'
            sx={{
              width: '100%',
              objectPosition: 'center',
              objectFit: 'cover',
              borderRadius: 1,
              height: 380,
              mt: 3,
            }}
          />
          {data.post.content && (
            <Container sx={{ py: 3 }}>
              <PostContent content={data.post.content} />
            </Container>
          )}
        </>
      )}
    </>
  );
};
