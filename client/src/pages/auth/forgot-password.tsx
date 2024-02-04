import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Card, CardContent, CardHeader, TextField } from '@mui/material';

import { resetPassword } from '@/api/auth';

export const Component = () => {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const handleResetPassword: SubmitHandler<{ email: string }> = async (data) => {
    await resetPassword(data.email);
  };
  return (
    <Card elevation={16}>
      <CardHeader
        sx={{ pb: 0 }}
        title='Forgot password'
      />
      <CardContent>
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
          >
            Send reset link
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
