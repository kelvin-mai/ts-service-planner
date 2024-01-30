import { toast } from 'react-hot-toast';

const baseUrl = 'http://localhost:8080';
const apiUrl = `${baseUrl}/api`;

export type Post = {
  id: string;
  title: string;
  description: string;
  category: string;
  content?: string;
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

export const createPost = async (body: any) => {
  const res = await fetch(`${apiUrl}/post`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  toast.success('Successfully created post');
  return await res.json();
};

export const updatePost = async (id: string, body: any) => {
  const res = await fetch(`${apiUrl}/post/${id}`, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  toast.success('Successfully updated post');
  return await res.json();
};

export const deletePost = async (id: string) => {
  const res = await fetch(`${apiUrl}/post/${id}`, {
    method: 'DELETE',
  });
  toast.success('Successfully deleted post');
  return await res.json();
};
