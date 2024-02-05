import { useAuth } from '@/hooks';
import { Box } from '@mui/material';
import { useEffect, type FC, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import { Logo } from '../common';

type AuthGuardProps = PropsWithChildren &
  (
    | { authorized?: boolean; authorizeId?: undefined }
    | {
        authorized: true;
        authorizeId: string;
      }
  );

export const AuthGuard: FC<AuthGuardProps> = ({ authorized, authorizeId, children }) => {
  const { user, isPending, isAuthorized } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isPending) {
      if (!user) {
        navigate('/auth/login', { replace: true });
      }
      if (authorized && Boolean(authorizeId) && !isAuthorized(authorizeId)) {
        navigate('/auth/login', { replace: true });
      }
    }
  }, [isPending, authorized, authorizeId]);
  if (isPending) {
    return (
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
          left: 0,
          p: 3,
          position: 'fixed',
          top: 0,
          width: '100vw',
          zIndex: 1400,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            height: 48,
            width: 48,
          }}
        >
          <Logo />
        </Box>
      </Box>
    );
  }
  if (!user) {
    return null;
  }
  if (authorized && Boolean(authorizeId) && !isAuthorized(authorizeId)) {
    return null;
  }
  return children;
};
