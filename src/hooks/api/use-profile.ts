import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';

import { signOut } from '@/api/auth';
import { type Profile, type ProfileDTO, getProfile, updateProfile } from '@/api/profile';
import { withInvalidate, withReset } from '@/api/utils';

export const useProfile = () => {
  const getQuery = (id?: string) =>
    useQuery({
      queryKey: ['profile'],
      queryFn: () => getProfile(id),
    });

  const getUpdateMutation = (
    id: string,
    options?: UseMutationOptions<Profile, Error, ProfileDTO>
  ) =>
    useMutation({
      mutationFn: (data: ProfileDTO) => updateProfile(id, data),
      onSuccess: withInvalidate(['profile'], options?.onSuccess),
      onError: options?.onError,
    });

  const getSignOutMutation = (options?: UseMutationOptions<Profile, Error>) =>
    useMutation({
      mutationFn: () => signOut(),
      onSuccess: withReset(['profile'], options?.onSuccess),
      onError: options?.onError,
    });

  return {
    getQuery,
    getUpdateMutation,
    getSignOutMutation,
  };
};
