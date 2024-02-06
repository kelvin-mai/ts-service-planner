import type { FC } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';

import { Logo, RouterLink } from '@/components/common';

import { SideNavItem } from './side-nav-item';
import { useLocation } from 'react-router';
import { NavItem } from './nav-item';

type SideNavProps = {
  onClose?: () => void;
  open?: boolean;
  items: NavItem[];
};

export const SideNav: FC<SideNavProps> = ({ onClose, open, items }) => {
  const location = useLocation();

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
          <Box
            sx={{
              color: 'text.primary',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: '0.3px',
              lineHeight: 2.5,
              '& span': {
                color: 'primary.main',
              },
            }}
          >
            Service <span>Planner</span>
          </Box>
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
              active={location.pathname === item.path}
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
