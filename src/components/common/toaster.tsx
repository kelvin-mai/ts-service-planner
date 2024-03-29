import type { FC } from 'react';
import { Toaster as HotToaster } from 'react-hot-toast';
import { alpha, useTheme } from '@mui/material';

export const Toaster: FC = () => {
  const theme = useTheme();
  return (
    <HotToaster
      position='bottom-right'
      toastOptions={{
        style: {
          fontFamily: theme.typography.fontFamily,
          backdropFilter: 'blur(6px)',
          background: alpha(theme.palette.neutral[900], 0.8),
          color: theme.palette.common.white,
          boxShadow: theme.shadows[16],
        },
      }}
    />
  );
};
