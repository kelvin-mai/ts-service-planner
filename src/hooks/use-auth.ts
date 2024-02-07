import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '@/context/auth';
import { Profile, getProfile } from '@/api/profile';
import { Session } from '@supabase/supabase-js';

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

export const useAuth = () => {
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

  return {
    ...auth,
    isPending,
    profile: data,
    isAuthorized,
  } as UseAuthObject;
};
