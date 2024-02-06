import type { FC } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';

import { RouterLink } from '@/components/common';

type TopNavItemProps = {
  active?: boolean;
  external?: boolean;
  path?: string;
  title: string;
};

export const TopNavItem: FC<TopNavItemProps> = ({ active, external, path, title }) => {
  console.log({ active, path, external, title });
  const linkProps = path
    ? external
      ? {
          component: 'a',
          href: path,
          target: '_blank',
        }
      : {
          component: RouterLink,
          href: path,
        }
    : {};

  return (
    <Box
      component='li'
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <ButtonBase
        disableRipple
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          px: '16px',
          py: '8px',
          textAlign: 'left',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          ...(active && {
            color: 'primary.main',
          }),
        }}
        {...linkProps}
      >
        <Typography
          component='span'
          variant='subtitle2'
        >
          {title}
        </Typography>
      </ButtonBase>
    </Box>
  );
};
