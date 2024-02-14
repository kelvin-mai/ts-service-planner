import { useQuery } from '@tanstack/react-query';

import { getImageUrl } from '@/api/storage';

export const useStorage = () => {
  const getImageUrlQuery = (bucket: string, filename: string) =>
    useQuery({
      queryKey: [bucket, filename],
      queryFn: () => getImageUrl(bucket, filename),
      staleTime: 60 * 60 * 1000,
    });

  return { getImageUrlQuery };
};
