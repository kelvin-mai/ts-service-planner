import type { FC } from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Box, Link, Typography } from '@mui/material';

import { RouterLink } from './router-link';

export type BreadcrumbLink = {
  title: string;
  href: string;
};

type BreadcrumbsProps = {
  links: BreadcrumbLink[];
  current: string;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ links, current }) => {
  return (
    <MuiBreadcrumbs
      separator={
        <Box sx={{ backgroundColor: 'neutral.500', borderRadius: '50%', height: 4, width: 4 }} />
      }
    >
      {links.map((l) => (
        <Link
          key={l.title}
          color='text.primary'
          component={RouterLink}
          href={l.href}
          variant='subtitle2'
        >
          {l.title}
        </Link>
      ))}
      <Typography
        color='text.secondary'
        variant='subtitle2'
      >
        {current}
      </Typography>
    </MuiBreadcrumbs>
  );
};
