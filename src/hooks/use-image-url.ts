import { useEffect, useState } from 'react';

import { supabase } from '@/api';

export const useImageUrl = (bucket: string, filename: string) => {
  const [imageUrl, setImageUrl] = useState<string>();

  const getImageUrl = async () => {
    const { data } = await supabase.storage.from(bucket).download(filename);
    return data ? URL.createObjectURL(data) : undefined;
  };

  useEffect(() => {
    getImageUrl().then(setImageUrl);
  }, [bucket, filename]);
  return imageUrl;
};
