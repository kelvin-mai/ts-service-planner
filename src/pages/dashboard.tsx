import { Heading, Main, Seo, type BreadcrumbLink } from '@/components/common';

export const Component = () => {
  const breadcrumbs: BreadcrumbLink[] = [{ title: 'Home', href: '/' }];
  return (
    <Main>
      <Seo title='Dashboard' />
      <Heading
        title='Dashboard'
        breadcrumbs={breadcrumbs}
      />
    </Main>
  );
};
