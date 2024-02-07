import { useEffect, type FC, type PropsWithChildren, useState, useMemo } from 'react';
import { useLocation } from 'react-router';
import { styled, useMediaQuery, type Theme, useTheme, Drawer } from '@mui/material';

import { TopNav } from './top-nav';
import { SideNav } from './side-nav';
import { sections } from './sections';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
});

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const theme = useTheme();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const cssVars = useMemo((): Record<string, string> => {
    if (theme.palette.mode === 'dark') {
      return {
        '--nav-bg': theme.palette.neutral[900],
        '--nav-color': theme.palette.neutral[100],
        '--nav-border-color': theme.palette.neutral[700],
        '--nav-logo-border': theme.palette.neutral[700],
        '--nav-section-title-color': theme.palette.neutral[400],
        '--nav-item-color': theme.palette.neutral[400],
        '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
        '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
        '--nav-item-active-color': theme.palette.text.primary,
        '--nav-item-disabled-color': theme.palette.neutral[600],
        '--nav-item-icon-color': theme.palette.neutral[500],
        '--nav-item-icon-active-color': theme.palette.primary.main,
        '--nav-item-icon-disabled-color': theme.palette.neutral[700],
        '--nav-item-chevron-color': theme.palette.neutral[700],
        '--nav-scrollbar-color': theme.palette.neutral[400],
      };
    } else {
      return {
        '--nav-bg': theme.palette.neutral[50],
        '--nav-color': theme.palette.text.primary,
        '--nav-border-color': theme.palette.divider,
        '--nav-logo-border': theme.palette.neutral[200],
        '--nav-section-title-color': theme.palette.neutral[500],
        '--nav-item-color': theme.palette.neutral[500],
        '--nav-item-hover-bg': theme.palette.action.hover,
        '--nav-item-active-bg': theme.palette.action.selected,
        '--nav-item-active-color': theme.palette.text.primary,
        '--nav-item-disabled-color': theme.palette.neutral[400],
        '--nav-item-icon-color': theme.palette.neutral[400],
        '--nav-item-icon-active-color': theme.palette.primary.main,
        '--nav-item-icon-disabled-color': theme.palette.neutral[400],
        '--nav-item-chevron-color': theme.palette.neutral[400],
        '--nav-scrollbar-color': theme.palette.neutral[900],
      };
    }
  }, [theme]);
  return (
    <>
      <TopNav onMobileNavOpen={() => setOpen(true)} />
      {lgUp && (
        <Drawer
          anchor='left'
          open
          variant='permanent'
          PaperProps={{
            sx: {
              ...cssVars,
              backgroundColor: 'var(--nav-bg)',
              borderRightColor: 'var(--nav-border-color)',
              borderRightStyle: 'solid',
              borderRightWidth: 1,
              color: 'var(--nav-color)',
              width: 280,
            },
          }}
        >
          <SideNav sections={sections} />
        </Drawer>
      )}
      {!lgUp && (
        <Drawer
          anchor='left'
          onClose={() => setOpen(false)}
          open={open}
          variant='temporary'
          PaperProps={{
            sx: {
              ...cssVars,
              backgroundColor: 'var(--nav-bg)',
              color: 'var(--nav-color)',
              width: 280,
            },
          }}
        >
          <SideNav sections={sections} />
        </Drawer>
      )}
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};
