import { format, subHours } from 'date-fns';
import { Box, Button, Card, Chip, Container, Divider, Stack, Typography } from '@mui/material';
import { json, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { RouterLink, Seo, Breadcrumbs, type BreadcrumbLink } from '@/components/common';
import { PostNewsletter, PostContent } from '@/components/blog';
import { fetchPost, type Post } from '@/api/post';

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

  return isPending ? (
    <>loading...</>
  ) : (
    <>
      <Seo title='Blog: Post Details' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={1}>
            <Typography variant='h3'>Post</Typography>
            <Breadcrumbs
              links={breadcrumbs}
              current={data.post.title}
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
              href={`/blog/${data.post.id}/edit`}
              variant='contained'
            >
              Edit Post
            </Button>
          </Card>
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
            sx={{
              // backgroundImage: `url(${data.post.cover || ''})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
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
          <Divider sx={{ my: 3 }} />
          <Box sx={{ mt: 8 }}>
            <PostNewsletter />
          </Box>
        </Container>
      </Box>
    </>
  );
};
