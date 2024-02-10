import { supabase } from './index';
import { Profile } from './profile';

export type CommentDTO = {
  author: string;
  content: string;
  post_id: string;
};

export type Comment = Omit<CommentDTO, 'author'> & {
  id: string;
  author: Profile;
  created_at: string;
};

const selection = '*, author (id, full_name)';

export const getComments = async (post_id: string): Promise<Comment[]> => {
  const { data, error } = await supabase.from('comments').select(selection).match({ post_id });
  if (error) {
    throw error;
  }
  return data;
};

export const createComment = async (body: CommentDTO): Promise<Comment> => {
  const { data, error } = await supabase.from('comments').insert(body).select(selection).single();
  if (error) {
    throw error;
  }
  return data;
};

export const deleteComment = async (id: string) => {
  const { data, error } = await supabase
    .from('comments')
    .delete()
    .match({ id })
    .select(selection)
    .single();
  if (error) {
    throw error;
  }
  return data;
};
