import type { FC } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Menu01 } from '@untitled-ui/icons-react';
import {
  alpha,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  useMediaQuery,
  type Theme,
} from '@mui/material';

import { NavItem } from '@/types';
import { Brand, Logo, RouterLink } from '@/components/common';
import { useWindowScroll } from '@/hooks';
import { TopNavItem } from './top-nav-item';

type TopNavProps = {
  items: NavItem[];
  onMobileNavOpen?: () => void;
};

export const TopNav: FC<TopNavProps> = ({ items, onMobileNavOpen }) => {
  const { pathname } = useLocation();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [elevate, setElevate] = useState<boolean>(false);
  const TOP_NAV_HEIGHT = 64;

  useWindowScroll({
    handler: () => {
      if (window.scrollY > TOP_NAV_HEIGHT) {
        setElevate(true);
      } else {
        setElevate(false);
      }
    },
    delay: 100,
  });

  return (
    <Box
      component='header'
      sx={{
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        pt: 2,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'transparent',
          borderRadius: 2.5,
          boxShadow: 'none',
          transition: (theme) =>
            theme.transitions.create('box-shadow, background-color', {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          ...(elevate && {
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
            boxShadow: 8,
          }),
        }}
      >
        <Stack
          direction='row'
          spacing={2}
          sx={{ height: TOP_NAV_HEIGHT }}
        >
          <Stack
            alignItems='center'
            direction='row'
            spacing={1}
            sx={{ flexGrow: 1 }}
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
              {mdUp && <Brand />}
            </Stack>
          </Stack>
          {mdUp && (
            <Stack
              alignItems='center'
              direction='row'
              spacing={2}
            >
              <Box
                component='nav'
                sx={{ height: '100%' }}
              >
                <Stack
                  component='ul'
                  alignItems='center'
                  justifyContent='center'
                  direction='row'
                  spacing={1}
                  sx={{
                    height: '100%',
                    listStyle: 'none',
                    m: 0,
                    p: 0,
                  }}
                >
                  <>
                    {items.map((item) => (
                      <TopNavItem
                        active={pathname === item.path}
                        external={item.external}
                        key={item.title}
                        path={item.path}
                        title={item.title}
                      />
                    ))}
                  </>
                </Stack>
              </Box>
            </Stack>
          )}
          <Stack
            alignItems='center'
            direction='row'
            justifyContent='flex-end'
            spacing={2}
            sx={{ flexGrow: 1 }}
          >
            <Button
              component={RouterLink}
              size={mdUp ? 'medium' : 'small'}
              variant='contained'
              href='/auth/login'
            >
              Log In
            </Button>
            {!mdUp && (
              <IconButton onClick={onMobileNavOpen}>
                <SvgIcon fontSize='small'>
                  <Menu01 />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
