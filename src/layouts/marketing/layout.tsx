import { useState, type FC, type PropsWithChildren, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import { styled } from '@mui/material/styles';

import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { NavItem } from './nav-item';
import { useLocation } from 'react-router';

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
  const location = useLocation();
  const handlePathnameChange = () => {
    if (open) {
      setOpen(false);
    }
  };
  useEffect(() => {
    handlePathnameChange();
  }, [location.pathname]);
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
