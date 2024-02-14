import { supabase } from './index';

export const getImageUrl = (bucket: string, filename: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data.publicUrl;
};
