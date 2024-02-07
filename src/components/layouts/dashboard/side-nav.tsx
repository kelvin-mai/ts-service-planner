import type { FC } from 'react';
import { File04 } from '@untitled-ui/icons-react';
import { Box, Button, Stack, SvgIcon, Typography } from '@mui/material';

import { Brand, Logo, RouterLink, Scrollbar } from '@/components/common';
import { NavSection, type NavSectionProps } from './nav-section';

type SideNavProps = {
  sections: NavSectionProps[];
};

export const SideNav: FC<SideNavProps> = ({ sections }) => {
  return (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'var(--nav-scrollbar-color)',
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Stack
          alignItems='center'
          direction='row'
          spacing={2}
          sx={{ p: 3 }}
        >
          <Box
            component={RouterLink}
            href='/'
            sx={{
              borderColor: 'var(--nav-logo-border)',
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 1,
              display: 'flex',
              height: 40,
              p: '4px',
              width: 40,
            }}
          >
            <Logo />
          </Box>
          <Brand />
        </Stack>
        <Stack
          component='nav'
          spacing={2}
          sx={{
            flexGrow: 1,
            px: 2,
          }}
        >
          {sections.map((section, index) => (
            <NavSection
              key={index}
              {...section}
            />
          ))}
        </Stack>
        <Box sx={{ p: 3 }}>
          <Typography variant='subtitle1'>Need help?</Typography>
          <Typography
            color='neutral.400'
            sx={{ mb: 2 }}
            variant='body2'
          >
            Please check our docs.
          </Typography>
          <Button
            component={RouterLink}
            fullWidth
            href='/docs'
            startIcon={
              <SvgIcon>
                <File04 />
              </SvgIcon>
            }
            variant='contained'
          >
            Documentation
          </Button>
        </Box>
      </Stack>
    </Scrollbar>
  );
};
