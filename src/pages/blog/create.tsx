import { type BreadcrumbLink, Heading, Main, Seo } from '@/components/common';
import { PostForm } from '@/components/blog';
import { AuthGuard } from '@/components/auth';
import { usePosts } from '@/hooks/api';

export const Component = () => {
  const { getCreateMutation } = usePosts();
  const createMutation = getCreateMutation();

  const breadcrumbs: BreadcrumbLink[] = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
  ];

  return (
    <AuthGuard>
      <Main>
        <Seo title='Create a new Post' />
        <Heading
          breadcrumbs={breadcrumbs}
          title='Create a new Post'
          current='New'
        />
        <PostForm
          mode='create'
          onSubmit={createMutation.mutate}
        />
      </Main>
    </AuthGuard>
  );
};
