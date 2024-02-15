import { Stack } from '@mui/material';

import { type BreadcrumbLink, Main, Seo, Heading } from '@/components/common';

export const Component = () => {
  const breadcrumbs: BreadcrumbLink[] = [{ title: 'Home', href: '/' }];
  return (
    <Main>
      <Seo title='Calendar' />
      <Heading
        title='Calendar'
        breadcrumbs={breadcrumbs}
      />
      <Stack spacing={3}>{/* <Calendar /> */}</Stack>
    </Main>
  );
};
