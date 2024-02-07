import { useState, type FC, type PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router';
import { styled, useMediaQuery, type Theme } from '@mui/material';

import { NavItem } from '@/types/nav-item';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
}));

const items: NavItem[] = [
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: 'Pricing',
    path: '/pricing',
  },
];

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [pathname]);
  return (
    <>
      <TopNav
        onMobileNavOpen={() => setOpen(true)}
        items={items}
      />
      {!lgUp && (
        <SideNav
          onClose={() => setOpen(false)}
          open={open}
          items={items}
        />
      )}
      <LayoutRoot>{children}</LayoutRoot>
    </>
  );
};
