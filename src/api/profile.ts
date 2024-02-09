import { supabase } from './index';

export type ProfileDTO = {
  full_name: string;
  avatar?: Blob;
};

export type Profile = {
  id: string;
  full_name: string | null;
  updated_at: string | null;
};

export const getProfile = async (id?: string) => {
  if (!id) {
    return null;
  }
  const { data, error } = await supabase.from('profiles').select().eq('id', id).single();
  if (error) {
    throw error;
  }
  return data;
};

export const updateProfile = async (id: string, { avatar, ...body }: ProfileDTO) => {
  const prepared = { ...body, updated_at: new Date() };
  const { data, error } = await supabase
    .from('profiles')
    .update(prepared)
    .match({ id })
    .select()
    .single();
  if (error) {
    throw error;
  }
  if (avatar) {
    const { data, error } = await supabase.storage.from('avatars').upload(`${id}`, avatar);
    console.log('upload data', data);
    if (error) {
      throw error;
    }
  }
  return data;
};
