import type { FC, ReactNode } from 'react';
import { useLocation } from 'react-router';
import { Box, ButtonBase, Stack, SvgIcon } from '@mui/material';

import { RouterLink } from '@/components/common';
import { NavItem } from '@/types';

type NavLinkProps = NavItem & {
  icon?: ReactNode;
};

const NavLink: FC<NavLinkProps> = ({ disabled, external, icon, path, title }) => {
  const { pathname } = useLocation();
  const active = pathname === path;
  const linkProps = path
    ? external
      ? { component: 'a', href: path, target: '_blank' }
      : { component: RouterLink, href: path }
    : {};

  return (
    <li>
      <ButtonBase
        disabled={disabled}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'var(--nav-item-active-bg)',
          }),
          '&:hover': {
            backgroundColor: 'var(--nav-item-hover-bg)',
          },
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component='span'
            sx={{
              alignItems: 'center',
              color: 'var(--nav-item-icon-color)',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'var(--nav-item-icon-active-color)',
              }),
            }}
          >
            <SvgIcon fontSize='small'>{icon}</SvgIcon>
          </Box>
        )}
        <Box
          component='span'
          sx={{
            color: 'var(--nav-item-color)',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'var(--nav-item-active-color)',
            }),
            ...(disabled && {
              color: 'var(--nav-item-disabled-color)',
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

export type NavSectionProps = {
  items: NavLinkProps[];
  subheader?: string;
};

export const NavSection: FC<NavSectionProps> = ({ items, subheader, ...props }) => {
  return (
    <Stack
      component='ul'
      spacing={0.5}
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
      }}
      {...props}
    >
      {subheader && (
        <Box
          component='li'
          sx={{
            color: 'var(--nav-section-title-color)',
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1.66,
            mb: 1,
            ml: 1,
            textTransform: 'uppercase',
          }}
        >
          {subheader}
        </Box>
      )}
      {items.map((item, index) => (
        <NavLink
          key={index}
          {...item}
        />
      ))}
    </Stack>
  );
};
