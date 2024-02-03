import { type FC, useState } from 'react';
import { Box, Button, Link, Stack, TextField } from '@mui/material';

import { supabase } from '@/api';
import { RouterLink } from '@/components/common';

type AuthFormProps = {
  submitText: string;
};

export const AuthForm: FC<AuthFormProps> = ({ submitText }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    // const res = await supabase.auth.signUp({ email, password });
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (res.error) {
      const { error } = res;
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label='Email address'
          name='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          size='large'
          sx={{ mt: 2 }}
          type='submit'
          variant='contained'
          disabled={loading}
        >
          {submitText}
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
