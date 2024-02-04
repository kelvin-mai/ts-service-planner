import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Card, CardContent, CardHeader, TextField } from '@mui/material';

import { updatePassword } from '@/api/auth';

export const Component = () => {
  const { register, handleSubmit } = useForm<{ password: string }>();
  const handleUpdatePassword: SubmitHandler<{ password: string }> = async (data) => {
    await updatePassword(data.password);
  };
  return (
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
          >
            Send reset link
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
