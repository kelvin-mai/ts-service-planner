import { json, useParams } from 'react-router';
import { Button, Skeleton, Stack, Typography } from '@mui/material';

import { RouterLink, Seo, Breadcrumbs, type BreadcrumbLink } from '@/components/common';
import { BlogActions, PostDetails } from '@/components/blog';
import { usePostsApi } from '@/api/hooks';
import { useAuth } from '@/hooks';

export const Component = () => {
  const { isAuthorized } = useAuth();
  const { id } = useParams();
  if (!id) {
    throw json({}, { status: 404 });
  }
  const { getPostQuery } = usePostsApi();
  const { data, isPending, isError } = getPostQuery(id);
  if (isError) {
    throw json({}, { status: 404 });
  }
  const authorized = isAuthorized(data?.post.author.id);

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
    <>
      <Seo title={data?.post.title || 'Post Details'} />
      <Stack spacing={1}>
        <Typography variant='h2'>Post</Typography>
        <Breadcrumbs
          links={breadcrumbs}
          current={data?.post.title || 'Post'}
        />
      </Stack>
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
    </>
  );
};
