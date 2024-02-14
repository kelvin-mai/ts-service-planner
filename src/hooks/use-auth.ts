import { useContext } from 'react';
import type { Session } from '@supabase/supabase-js';

import { AuthContext } from '@/context/auth';
import type { Profile } from '@/api/profile';
import { useProfile } from '@/hooks/api';

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
  const { getQuery } = useProfile();
  const { data, isPending } = getQuery(auth?.user.id);

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
