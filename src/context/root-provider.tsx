import type { FC, PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { createTheme } from '@/theme';
import { apiClient } from '@/api';
import { Toaster } from '@/components/common';
import { AuthProvider } from './auth';

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    colorPreset: 'indigo',
    contrast: 'normal',
    direction: 'ltr',
    paletteMode: 'light',
    responsiveFontSizes: true,
  });

  return (
    <HelmetProvider>
      <QueryClientProvider client={apiClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};
