import type { FC } from 'react';
import { Box, ButtonBase } from '@mui/material';

import { RouterLink } from '@/components/common';

type SideNavItemProps = {
  active?: boolean;
  external?: boolean;
  path?: string;
  title: string;
};

export const SideNavItem: FC<SideNavItemProps> = ({ active, external, path, title }) => {
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
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          px: '12px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'action.hover',
          }),
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
        {...linkProps}
      >
        <Box
          component='span'
          sx={{
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'primary.main',
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};
