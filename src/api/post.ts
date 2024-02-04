import { supabase } from './index';

export type PostDTO = {
  title: string;
  description: string;
  category: string;
  content: string;
  cover?: Blob;
};

export type Post = Omit<PostDTO, 'cover'> & {
  id: string;
  readTime: number;
  publishedAt: string;
};

export const fetchPosts = async (page: number) => {
  const from = page ? (page - 1) * 4 : 0;
  const to = from + 4;
  const { data, count, error } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .range(from, to);
  if (error) {
    throw error;
  }
  return { posts: data || [], hasNext: (count || 0) > to };
};

export const fetchPost = async (id: string) => {
  const { data, error } = await supabase.from('posts').select().match({ id }).single();
  if (error) {
    throw error;
  }
  return { post: data };
};

export const createPost = async ({ cover, ...body }: PostDTO) => {
  const { data, error } = await supabase.from('posts').insert(body).select().single();
  if (error) {
    throw error;
  }

  if (cover) {
    const { error } = await supabase.storage.from('posts').upload(`cover-${data.id}`, cover);
    if (error) {
      throw error;
    }
  }
  return data;
};

export const updatePost = async (id: string, { cover, ...body }: PostDTO) => {
  const { data, error } = await supabase.from('posts').update(body).match({ id }).select().single();
  if (error) {
    throw error;
  }
  if (cover) {
    const { error } = await supabase.storage.from('posts').upload(`cover-${data.id}`, cover);
    if (error) {
      throw error;
    }
  }
  return data;
};

export const deletePost = async (id: string) => {
  const { data, error } = await supabase.from('posts').delete().match({ id }).select().single();
  if (error) {
    throw error;
  }
  return data;
};
