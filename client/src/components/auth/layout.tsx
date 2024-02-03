import type { FC, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { Logo, RouterLink } from '@/components/common';

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
  backgroundImage: 'url("/assets/gradient-bg.svg")',
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  height: '100%',
}));

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutRoot>
      <Box
        component='header'
        sx={{
          left: 0,
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Container maxWidth='lg'>
          <Stack
            direction='row'
            spacing={2}
            sx={{ height: 64 }}
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
          </Stack>
        </Container>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flex: '1 1 auto',
        }}
      >
        <Container
          maxWidth='sm'
          sx={{
            py: {
              xs: '60px',
              md: '120px',
            },
          }}
        >
          {children}
        </Container>
      </Box>
    </LayoutRoot>
  );
};
