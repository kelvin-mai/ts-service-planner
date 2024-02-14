import type { FC } from 'react';
import { Stack, Typography } from '@mui/material';

import { Breadcrumbs, type BreadcrumbLink } from '../breadcrumbs';

type HeadingProps = {
  breadcrumbs: BreadcrumbLink[];
  title: string;
  current?: string;
};

export const Heading: FC<HeadingProps> = ({ breadcrumbs, title, current }) => {
  return (
    <Stack spacing={1}>
      <Typography variant='h2'>{title}</Typography>
      <Breadcrumbs
        links={breadcrumbs}
        current={current || title}
      />
    </Stack>
  );
};
