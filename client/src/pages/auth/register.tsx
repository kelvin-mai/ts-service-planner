import { Box, Card, CardContent, CardHeader, Link, SvgIcon, Typography } from '@mui/material';

import { RouterLink, Seo } from '@/components/common';
import { ArrowLeft } from '@untitled-ui/icons-react';
import { AuthForm } from '@/components/auth';

export const Component = () => {
  return (
    <>
      <Seo title='Register' />
      <div>
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
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography
                color='text.secondary'
                variant='body2'
              >
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  href='/auth/login'
                  underline='hover'
                  variant='subtitle2'
                >
                  Login
                </Link>
              </Typography>
            }
          />
          <CardContent>
            <AuthForm submitText='Rester' />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
