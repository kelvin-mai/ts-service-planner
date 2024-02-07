import type { FC } from 'react';
import { useLocation } from 'react-router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';

import { Brand, Logo, RouterLink } from '@/components/common';
import { NavItem } from '@/types';
import { SideNavItem } from './side-nav-item';

type SideNavProps = {
  onClose?: () => void;
  open?: boolean;
  items: NavItem[];
};

export const SideNav: FC<SideNavProps> = ({ onClose, open, items }) => {
  const { pathname } = useLocation();

  return (
    <Drawer
      anchor='right'
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 300,
        },
      }}
      variant='temporary'
    >
      <Box
        sx={{
          pt: 2,
          px: 2,
        }}
      >
        <Stack
          alignItems='center'
          component={RouterLink}
          direction='row'
          display='inline-flex'
          href='/'
          spacing={1}
          sx={{ textDecoration: 'none' }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              height: 24,
              width: 24,
            }}
          >
            <Logo />
          </Box>
          <Brand />
        </Stack>
      </Box>
      <Box
        component='nav'
        sx={{ p: 2 }}
      >
        <Stack
          component='ul'
          spacing={1}
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
          }}
        >
          {items.map((item) => (
            <SideNavItem
              active={pathname === item.path}
              external={item.external}
              key={item.title}
              path={item.path}
              title={item.title}
            />
          ))}
        </Stack>
      </Box>
    </Drawer>
  );
};
