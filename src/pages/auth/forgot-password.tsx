import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Card, CardContent, CardHeader, Stack, TextField, Typography } from '@mui/material';

import { resetPassword } from '@/api/auth';

export const Component = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<{ email: string }>();
  const handleResetPassword: SubmitHandler<{ email: string }> = async (data) => {
    setPending(true);
    await resetPassword(data.email);
    setSubmitted(true);
  };
  return (
    <Card elevation={16}>
      <CardHeader
        sx={{ pb: 0 }}
        title='Forgot password'
      />
      <CardContent>
        {submitted ? (
          <Stack spacing={3}>
            <Typography variant='subtitle1'>Almost done...</Typography>
            <Typography variant='subtitle2'>
              An email was sent to your account. Open it up to activate your account.
            </Typography>
          </Stack>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit(handleResetPassword)}
          >
            <TextField
              autoFocus
              fullWidth
              label='Email Address'
              type='email'
              {...register('email')}
            />
            <Button
              fullWidth
              size='large'
              sx={{ mt: 2 }}
              type='submit'
              variant='contained'
              disabled={pending}
            >
              Send reset link
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
