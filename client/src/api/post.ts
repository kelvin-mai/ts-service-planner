import { toast } from 'react-hot-toast';

import { getApiUrl } from '@/utils/url';
import { uploadFile, deleteFile } from './file';

const apiUrl = getApiUrl();

type PostDTO = {
  title: string;
  description: string;
  category: string;
  content?: string;
  cover?: Blob;
};

export type Post = Omit<PostDTO, 'cover'> & {
  id: string;
  readTime: number;
  publishedAt: string;
};

export const fetchPosts = async () => {
  const res = await fetch(`${apiUrl}/post`);
  return await res.json();
};

export const fetchPost = async (id: string) => {
  const res = await fetch(`${apiUrl}/post/${id}`);
  return await res.json();
};

export const createPost = async (body: PostDTO) => {
  const res = await fetch(`${apiUrl}/post`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  if (body.cover) {
    const filename = `post-cover-${(data.post as Post).id}`;
    await uploadFile(filename, body.cover);
  }
  toast.success('Successfully created post');
  return data;
};

export const updatePost = async (id: string, body: any) => {
  const res = await fetch(`${apiUrl}/post/${id}`, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  if (body.cover) {
    const filename = `post-cover-${(data.post as Post).id}`;
    await uploadFile(filename, body.cover);
  }
  toast.success('Successfully updated post');
  return data;
};

export const deletePost = async (id: string) => {
  const res = await fetch(`${apiUrl}/post/${id}`, {
    method: 'DELETE',
  });
  const filename = `post-cover-${id}`;
  await deleteFile(filename);
  toast.success('Successfully deleted post');
  return await res.json();
};
