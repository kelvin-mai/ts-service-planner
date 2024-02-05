import { supabase } from './index';
import { Profile } from './profile';

export type PostDTO = {
  title: string;
  description: string;
  category: string;
  content: string;
  cover?: Blob;
};

export type Post = Omit<PostDTO, 'cover'> & {
  id: string;
  // readTime: number;
  author: Profile;
  created_at: string;
  updated_at: string | null;
};

const selection = `
id,
title,
description,
category,
content,
created_at,
updated_at,
author (id, full_name)
`;

export const fetchPosts = async (page: number): Promise<{ posts: Post[]; hasNext: boolean }> => {
  const from = page ? (page - 1) * 4 : 0;
  const to = from + 4;
  const { data, count, error } = await supabase
    .from('posts')
    .select(selection, { count: 'exact' })
    .range(from, to);
  if (error) {
    throw error;
  }
  const posts: Post[] = data as any;
  return { posts, hasNext: (count || 0) > to };
};

export const fetchPost = async (id: string): Promise<{ post: Post }> => {
  const { data, error } = await supabase.from('posts').select(selection).match({ id }).single();
  if (error) {
    throw error;
  }
  const post: Post = data as any;
  return { post };
};

export const createPost = async ({ cover, ...body }: PostDTO) => {
  const { data, error } = await supabase.from('posts').insert(body).select().single();
  if (error) {
    throw error;
  }

  if (cover) {
    const { error } = await supabase.storage
      .from('posts')
      .upload(`cover-${data.id}`, cover, { upsert: true });
    if (error) {
      throw error;
    }
  }
  return data as Post;
};

export const updatePost = async (id: string, { cover, ...body }: PostDTO) => {
  const { data, error } = await supabase.from('posts').update(body).match({ id }).select().single();
  if (error) {
    throw error;
  }
  if (cover) {
    const { error } = await supabase.storage
      .from('posts')
      .upload(`cover-${data.id}`, cover, { upsert: true });
    if (error) {
      throw error;
    }
  }
  return data as Post;
};

export const deletePost = async (id: string) => {
  const { data, error } = await supabase.from('posts').delete().match({ id }).select().single();
  if (error) {
    throw error;
  }
  return data as Post;
};
