import type { FC, PropsWithChildren } from 'react';
import { Box, Container, Divider } from '@mui/material';

import { PostNewsletter } from './newsletter';

export const BlogLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth='xl'>
        {children}
        <Divider sx={{ my: 3 }} />
        <Box sx={{ mt: 8 }}>
          <PostNewsletter />
        </Box>
      </Container>
    </Box>
  );
};
