import { format, subHours } from 'date-fns';
import { Box, Button, Card, Chip, Container, Divider, Stack, Typography } from '@mui/material';
import { LoaderFunction, useLoaderData } from 'react-router';

import { RouterLink, Seo, Breadcrumbs, type BreadcrumbLink } from '@/components/common';
import { PostComment, PostCommentAdd, PostNewsletter, PostContent } from '@/components/blog';
import { Post } from '@/api/blog';
import { fetchPost } from '@/api/post';

interface Comment {
  id: string;
  authorAvatar: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: number;
  isLiked: boolean;
  likes: number;
}

const useComments = (): Comment[] => {
  return [
    {
      id: 'd0ab3d02ef737fa6b007e35d',
      authorAvatar: '/assets/avatars/avatar-alcides-antonio.png',
      authorName: 'Alcides Antonio',
      authorRole: 'Product Designer',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      createdAt: subHours(new Date(), 2).getTime(),
      isLiked: true,
      likes: 12,
    },
    {
      id: '3ac1e17289e38a84108efdf3',
      authorAvatar: '/assets/avatars/avatar-jie-yan-song.png',
      authorName: 'Jie Yan Song',
      authorRole: 'Web Developer',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      createdAt: subHours(new Date(), 8).getTime(),
      isLiked: false,
      likes: 8,
    },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { post } = await fetchPost(params.id as string);
  return post;
};

export const Component = () => {
  const post = useLoaderData() as Post;
  const comments = useComments();

  // const publishedAt = format(post.publishedAt, 'MMMM d, yyyy');

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
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
              current={post?.title!}
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
              href={`/blog/${post.id}/edit`}
              variant='contained'
            >
              Edit Post
            </Button>
          </Card>
          <Stack spacing={3}>
            <div>
              <Chip label={post.category} />
            </div>
            <Typography variant='h3'>{post.title}</Typography>
            <Typography
              color='text.secondary'
              variant='subtitle1'
            >
              {post.shortDescription}
            </Typography>
            <Stack
              alignItems='center'
              direction='row'
              spacing={2}
              sx={{ mt: 3 }}
            >
              {/* <Avatar src={post.author.avatar} />
              <div>
                <Typography variant='subtitle2'>
                  By {post.author.name} • {publishedAt}
                </Typography>
                <Typography
                  color='text.secondary'
                  variant='body2'
                >
                  {post.readTime} read
                </Typography>
              </div> */}
            </Stack>
          </Stack>
          <Box
            sx={{
              backgroundImage: `url(${post.cover})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: 1,
              height: 380,
              mt: 3,
            }}
          />
          {post.content && (
            <Container sx={{ py: 3 }}>
              <PostContent content={post.content} />
            </Container>
          )}
          <Divider sx={{ my: 3 }} />
          <Stack spacing={2}>
            {comments.map((comment) => (
              <PostComment
                key={comment.id}
                {...comment}
              />
            ))}
          </Stack>
          <Divider sx={{ my: 3 }} />
          <PostCommentAdd />
          <Box sx={{ mt: 8 }}>
            <PostNewsletter />
          </Box>
        </Container>
      </Box>
    </>
  );
};
