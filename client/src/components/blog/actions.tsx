import type { FC, PropsWithChildren } from 'react';
import { Card, Typography } from '@mui/material';

import { useAuth } from '@/hooks';

export const BlogActions: FC<PropsWithChildren> = ({ children }) => {
  const { profile } = useAuth();
  return (
    profile && (
      <Card
        elevation={16}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          mt: 6,
          px: 3,
          py: 2,
        }}
      >
        <Typography variant='subtitle1'>Hello, {profile.full_name}</Typography>
        {children}
      </Card>
    )
  );
};
