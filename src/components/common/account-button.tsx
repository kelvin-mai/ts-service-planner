import { type FC, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { User01, Settings04 } from '@untitled-ui/icons-react';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
  Typography,
} from '@mui/material';

import { RouterLink } from '@/components/common';
import type { Profile } from '@/api/profile';
import { useStorage, useProfile } from '@/hooks/api';

type AccountButtonProps = {
  profile: Profile;
};

export const AccountButton: FC<AccountButtonProps> = ({ profile }) => {
  const anchorRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { getSignOutMutation } = useProfile();
  const signOut = getSignOutMutation({
    onSuccess: () => navigate('/'),
    onError: () => toast.error('Something went wrong'),
  });
  const { getImageUrlQuery } = useStorage();
  const { data: avatar } = getImageUrlQuery('avatars', profile.id);
  return (
    <Box>
      <Box
        component={ButtonBase}
        onClick={() => setOpen(true)}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'divider',
          height: 40,
          width: 40,
          borderRadius: '50%',
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
          }}
          src={avatar}
        >
          <SvgIcon>
            <User01 />
          </SvgIcon>
        </Avatar>
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        disableScrollLock
        onClose={() => setOpen(false)}
        open={!!open}
        PaperProps={{ sx: { width: 200 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='body1'>{profile.full_name}</Typography>
          <Typography
            color='text.secondary'
            variant='body2'
          >
            demo@devias.io
          </Typography>
        </Box>
        <Divider />
        <ListItemButton
          component={RouterLink}
          href='/account'
          onClick={() => setOpen(false)}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize='small'>
              <Settings04 />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary={<Typography variant='body1'>Settings</Typography>} />
        </ListItemButton>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            p: 1,
            justifyContent: 'center',
          }}
        >
          <Button
            color='inherit'
            onClick={() => signOut.mutate()}
            size='small'
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};
