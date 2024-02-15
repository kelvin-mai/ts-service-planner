import { Heading, Main, Seo, type BreadcrumbLink } from '@/components/common';

export const Component = () => {
  const breadcrumbs: BreadcrumbLink[] = [{ title: 'Home', href: '/' }];
  return (
    <Main>
      <Seo title='People' />
      <Heading
        title='People'
        breadcrumbs={breadcrumbs}
      />
    </Main>
  );
};
