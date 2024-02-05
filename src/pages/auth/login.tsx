import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, Link, Typography } from '@mui/material';

import { RouterLink, Seo } from '@/components/common';
import { AuthForm } from '@/components/auth';

export const Component = () => {
  const navigate = useNavigate();
  const afterSubmit = () => {
    navigate('/');
  };
  return (
    <>
      <Seo title='Login' />
      <Card elevation={16}>
        <CardHeader
          title='Log in'
          subheader={
            <Typography
              color='text.secondary'
              variant='body2'
            >
              Don't have an account?{' '}
              <Link
                component={RouterLink}
                href='/auth/register'
                underline='hover'
                variant='subtitle2'
              >
                Register
              </Link>
            </Typography>
          }
        />
        <CardContent>
          <AuthForm
            authType='login'
            afterSubmit={afterSubmit}
          />
        </CardContent>
      </Card>
    </>
  );
};
