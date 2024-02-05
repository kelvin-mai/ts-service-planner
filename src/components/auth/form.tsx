import { type FC, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Link, Stack, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { RouterLink } from '@/components/common';
import { signIn, signUp, type AuthCredentials } from '@/api/auth';
import { apiClient } from '@/api';

type AuthFormProps = {
  authType: 'login' | 'register';
  afterSubmit: () => void;
};

export const AuthForm: FC<AuthFormProps> = ({ authType, afterSubmit }) => {
  const { register, handleSubmit } = useForm<AuthCredentials>();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: AuthCredentials) => (authType ? signIn(data) : signUp(data)),
    onSuccess: () => apiClient.invalidateQueries({ queryKey: ['profile'] }),
  });
  const handleLogin: SubmitHandler<AuthCredentials> = async (data) => {
    mutate(data);
    afterSubmit();
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
          disabled={isPending}
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
