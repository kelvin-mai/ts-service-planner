const baseUrl = 'http://localhost:8080';
const apiUrl = `${baseUrl}/api`;

export type Post = {
  id: string;
  title: string;
  description: string;
  category: string;
  content?: string;
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
    body,
    method: 'POST',
  });
  return await res.json();
};

export const updatePost = async (id: string, body: any) => {
  const res = await fetch(`${apiUrl}/post/${id}`, {
    body,
    method: 'PUT',
  });
  return await res.json();
};

export const deletePost = async (id: string) => {
  const res = await fetch(`${apiUrl}/post/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
};
