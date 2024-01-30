import type { FC } from 'react';
import { Box, Button, Container, Typography, useMediaQuery, type Theme } from '@mui/material';

import { Seo, RouterLink } from '@/components/common';

type ErrorPageProps = {
  code?: 401 | 404 | 500;
};

export const ErrorPage: FC<ErrorPageProps> = ({ code = 404 }) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const getStatus = (code: 401 | 404 | 500) => {
    switch (code) {
      case 401:
        return 'Authorization Required';
      case 404:
        return 'Not found';
      case 500:
        return 'Internal Server Error';
    }
  };
  const status = getStatus(code);

  return (
    <>
      <Seo title={`Error: ${status}`} />
      <Box
        component='main'
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          py: '80px',
        }}
      >
        <Container maxWidth='lg'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 6,
            }}
          >
            <Box
              alt={status}
              component='img'
              src={`/assets/errors/error-${code}.png`}
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400,
              }}
            />
          </Box>
          <Typography
            align='center'
            variant={mdUp ? 'h1' : 'h4'}
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align='center'
            color='text.secondary'
            sx={{ mt: 0.5 }}
          >
            You either tried some shady route or you came here by mistake. Whichever it is, try
            using the navigation.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Button
              component={RouterLink}
              href='/'
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
