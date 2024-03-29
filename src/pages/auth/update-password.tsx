import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Card, CardContent, CardHeader, TextField } from '@mui/material';

import { updatePassword } from '@/api/auth';
import { AuthGuard } from '@/components/auth';

export const Component = () => {
  const [pending, setPending] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<{ password: string }>();
  const navigate = useNavigate();
  const handleUpdatePassword: SubmitHandler<{ password: string }> = async (data) => {
    setPending(true);
    await updatePassword(data.password);
    navigate('/auth/login');
  };
  return (
    <AuthGuard>
      <Card elevation={16}>
        <CardHeader
          sx={{ pb: 0 }}
          title='Reset password'
        />
        <CardContent>
          <form
            noValidate
            onSubmit={handleSubmit(handleUpdatePassword)}
          >
            <TextField
              autoFocus
              fullWidth
              label='New Password'
              {...register('password')}
            />
            <Button
              fullWidth
              size='large'
              sx={{ mt: 2 }}
              type='submit'
              variant='contained'
              disabled={pending}
            >
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthGuard>
  );
};
