import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '@/context/auth';
import { Profile, getProfile } from '@/api/profile';
import { Session } from '@supabase/supabase-js';

type UseAuthOptions = {
  guard: boolean;
};

type UseAuthObject = Session & { isAuthorized: (id?: string) => boolean } & (
    | {
        isPending: true;
        profile: null;
      }
    | {
        isPending: false;
        profile: Profile;
      }
  );

export const useAuth = (options?: UseAuthOptions) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { data, isPending } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(auth?.user.id),
  });

  const isAuthorized = (id?: string) => {
    if (!id || !auth) {
      return false;
    }
    return auth?.user.id === id;
  };

  useEffect(() => {
    if (options?.guard && !isPending && !auth?.user) {
      navigate('/auth/login', { replace: true });
    }
  }, [options, auth, isPending]);

  return {
    ...auth,
    isPending,
    profile: data,
    isAuthorized,
  } as UseAuthObject;
};
