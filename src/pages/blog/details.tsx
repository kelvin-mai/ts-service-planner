import { json, useParams } from 'react-router';
import { Box, Button, Divider, Skeleton, Stack } from '@mui/material';

import { Heading, Main, RouterLink, Seo, type BreadcrumbLink } from '@/components/common';
import {
  BlogActions,
  PostComment,
  PostCommentAdd,
  PostDetails,
  PostNewsletter,
} from '@/components/blog';
import { useAuth } from '@/hooks';
import { useComments, usePosts } from '@/hooks/api';

export const Component = () => {
  const { isAuthorized } = useAuth();
  const { id } = useParams();
  if (!id) {
    throw json({}, { status: 404 });
  }
  const { getQuery } = usePosts();
  const { getAllQuery } = useComments(id);
  const { data, isPending, isError } = getQuery(id);
  const { data: comments, isPending: commentsIsPending } = getAllQuery();
  if (isError) {
    throw json({}, { status: 404 });
  }
  const authorized = isAuthorized(data?.post.author.id);

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
    <Main>
      <Seo title={data?.post.title || 'Post Details'} />
      <Heading
        breadcrumbs={breadcrumbs}
        title='Post'
        current={data?.post.title}
      />
      <BlogActions>
        {authorized && (
          <Button
            component={RouterLink}
            href={`/blog/${data?.post.id}/edit`}
            variant='contained'
            disabled={isPending}
          >
            Edit Post
          </Button>
        )}
      </BlogActions>
      {isPending ? (
        <Stack spacing={3}>
          <Skeleton height={40} />
          <Skeleton height={25} />
          <Skeleton height={400} />
        </Stack>
      ) : (
        <PostDetails
          id={data.post.id}
          authorId={data.post.author.id}
          authorName={data.post.author.full_name}
          category={data.post.category}
          publishedAt={data.post.updated_at || data.post.created_at}
          description={data.post.description}
          title={data.post.title}
          content={data.post.content}
        />
      )}
      <Divider sx={{ my: 3 }} />
      <Stack spacing={2}>
        {commentsIsPending ? (
          <Skeleton />
        ) : (
          comments?.map((c) => (
            <PostComment
              key={c.id}
              postAuthor={data?.post.author.id}
              {...c}
            />
          ))
        )}
      </Stack>
      <Divider sx={{ my: 3 }} />
      <PostCommentAdd postId={id} />
      <Divider sx={{ my: 3 }} />
      <Box sx={{ mt: 8 }}>
        <PostNewsletter />
      </Box>
    </Main>
  );
};
