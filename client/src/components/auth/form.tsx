import { type FC, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Link, Stack, TextField } from '@mui/material';

import { signIn, signUp, type AuthCredentials } from '@/api/auth';
import { RouterLink } from '@/components/common';

type AuthFormProps = {
  authType: 'login' | 'register';
};

export const AuthForm: FC<AuthFormProps> = ({ authType }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<AuthCredentials>();
  const handleLogin: SubmitHandler<AuthCredentials> = async (data) => {
    setLoading(true);
    const authenticate = authType === 'login' ? signIn : signUp;
    await authenticate(data);
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label='Email address'
          type='email'
          {...register('email')}
        />
        <TextField
          fullWidth
          label='Password'
          type='password'
          {...register('password')}
        />
        <Button
          fullWidth
          size='large'
          sx={{ mt: 2 }}
          type='submit'
          variant='contained'
          disabled={loading}
        >
          {authType === 'login' ? 'Log in' : 'Register'}
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Link
            component={RouterLink}
            href='/auth/forgot-password'
            underline='hover'
            variant='subtitle2'
          >
            Forgot password?
          </Link>
        </Box>
      </Stack>
    </form>
  );
};
