import { useParams, json } from 'react-router';

import { Heading, Main, type BreadcrumbLink, Seo } from '@/components/common';
import { PostForm } from '@/components/blog';
import { AuthGuard } from '@/components/auth';
import { usePosts } from '@/hooks/api';

export const Component = () => {
  const { id } = useParams();
  if (!id) {
    throw json({}, { status: 404 });
  }

  const { getQuery, getUpdateMutation, getDeleteMutation } = usePosts();
  const { data, isPending, isError } = getQuery(id);
  const updateMutation = getUpdateMutation(id);
  const deleteMutation = getDeleteMutation(id);

  if (isError) {
    throw json({}, { status: 404 });
  }

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
    <AuthGuard
      authorized
      authorizeId={data?.post.author.id}
    >
      <Main>
        <Seo title='Update this Post' />
        <Heading
          breadcrumbs={breadcrumbs}
          title='Update this Post'
          current={data?.post.title}
        />
        <PostForm
          mode='edit'
          post={data?.post}
          onSubmit={updateMutation.mutate}
          onDelete={deleteMutation.mutate}
          disabled={isPending}
        />
      </Main>
    </AuthGuard>
  );
};
