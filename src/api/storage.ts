import { supabase } from './index';

export const getImageUrl = async (bucket: string, filename: string) => {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(filename, 60);
  if (error) {
    throw error;
  }
  return data.signedUrl;
};

