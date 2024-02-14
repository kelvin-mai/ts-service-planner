import type { FC, PropsWithChildren } from 'react';
import { Box, Container } from '@mui/material';

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        py: 10,
      }}
    >
      <Container maxWidth='xl'>{children}</Container>
    </Box>
  );
};
