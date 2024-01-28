import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';

import { createTheme } from '@/theme';

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
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </HelmetProvider>
  );
};
