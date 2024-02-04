import { useEffect, useState } from 'react';

import { supabase } from '@/api';

export const useImageUrl = (bucket: string, filename: string) => {
  const [imageUrl, setImageUrl] = useState<string>();

  const getImageUrl = async () => {
    const { data, error } = await supabase.storage.from(bucket).download(filename);
    if (error) {
      console.log(error);
    }
    return data ? URL.createObjectURL(data) : undefined;
  };

  useEffect(() => {
    getImageUrl().then(setImageUrl);
  }, [filename]);

  return imageUrl;
};
