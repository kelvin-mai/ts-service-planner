import type { FC, PropsWithChildren } from 'react';
import { Box, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowLeft } from '@untitled-ui/icons-react';

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
          <Box sx={{ mb: 4 }}>
            <Link
              color='text.primary'
              component={RouterLink}
              href='/'
              sx={{
                alignItems: 'center',
                display: 'inline-flex',
              }}
              underline='hover'
            >
              <SvgIcon sx={{ mr: 1 }}>
                <ArrowLeft />
              </SvgIcon>
              <Typography variant='subtitle2'>Home</Typography>
            </Link>
          </Box>
          {children}
        </Container>
      </Box>
    </LayoutRoot>
  );
};
