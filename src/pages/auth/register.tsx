import { useState } from 'react';
import { Card, CardContent, CardHeader, Link, Typography } from '@mui/material';

import { RouterLink, Seo } from '@/components/common';
import { AuthForm } from '@/components/auth';
import { Stack } from '@mui/system';

export const Component = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const afterSubmit = () => {
    setSubmitted(true);
  };
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
          {submitted ? (
            <Stack spacing={1}>
              <Typography variant='subtitle1'>Almost done...</Typography>
              <Typography
                component='p'
                color='text.secondary'
                variant='subtitle2'
              >
                An email was sent to your account. Open it up to activate your account.
              </Typography>
            </Stack>
          ) : (
            <AuthForm
              authType='register'
              afterSubmit={afterSubmit}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};
