import type { FC } from 'react';
import { Menu01 } from '@untitled-ui/icons-react';
import { alpha, Box, IconButton, Stack, SvgIcon, useMediaQuery, type Theme } from '@mui/material';
import { useAuth } from '@/hooks';
import { AccountButton } from '@/components/common/account-button';

type TopNavProps = {
  onMobileNavOpen?: () => void;
};

export const TopNav: FC<TopNavProps> = ({ onMobileNavOpen, ...props }) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const { profile, isPending } = useAuth();

  const SIDE_NAV_WIDTH = 280;
  const TOP_NAV_HEIGHT = 64;

  return (
    <Box
      component='header'
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
        position: 'sticky',
        left: {
          lg: `${SIDE_NAV_WIDTH}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      {...props}
    >
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2,
        }}
      >
        <Stack
          alignItems='center'
          direction='row'
          spacing={2}
        >
          {!lgUp && (
            <IconButton onClick={onMobileNavOpen}>
              <SvgIcon>
                <Menu01 />
              </SvgIcon>
            </IconButton>
          )}
        </Stack>
        <Stack
          alignItems='center'
          direction='row'
          spacing={2}
        >
          {!isPending ? <AccountButton profile={profile} /> : null}
        </Stack>
      </Stack>
    </Box>
  );
};
