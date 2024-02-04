import { useContext } from 'react';

import { AuthContext } from '@/context/auth';
import { getProfile } from '@/api/profile';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(auth?.user.id),
  });
  return { ...auth, profile: data };
};
