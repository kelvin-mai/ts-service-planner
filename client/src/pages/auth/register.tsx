import { Card, CardContent, CardHeader, Link, Typography } from '@mui/material';

import { RouterLink, Seo } from '@/components/common';
import { AuthForm } from '@/components/auth';

export const Component = () => {
  return (
    <>
      <Seo title='Register' />
      <Card elevation={16}>
        <CardHeader
          title='Register'
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
          <AuthForm authType='register' />
        </CardContent>
      </Card>
    </>
  );
};
