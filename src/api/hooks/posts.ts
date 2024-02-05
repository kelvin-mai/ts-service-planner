import { useQuery, useMutation } from '@tanstack/react-query';

import { apiClient } from '../index';
import {
  type Post,
  type PostDTO,
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
} from '../post';

export const usePostsApi = () => {
  const getPostsQuery = (page: number) =>
    useQuery<{ posts: any[]; hasNext: boolean }>({
      queryKey: ['posts', page],
      queryFn: () => fetchPosts(page),
    });

  const getPostQuery = (id: string) =>
    useQuery<{ post: Post }>({
      queryKey: ['posts', id],
      queryFn: () => fetchPost(id),
    });

  const getCreateMutation = () =>
    useMutation<Post, Error, PostDTO>({
      mutationFn: (data: PostDTO) => createPost(data),
      onSuccess: () => apiClient.invalidateQueries({ queryKey: ['posts'] }),
    });

  const getUpdateMutation = (id: string) =>
    useMutation<Post, Error, PostDTO>({
      mutationFn: (data: PostDTO) => updatePost(id, data),
      onSuccess: () => apiClient.invalidateQueries({ queryKey: ['posts', id] }),
    });

  const getDeleteMutation = (id: string) =>
    useMutation<Post>({
      mutationFn: () => deletePost(id),
      onSuccess: () => apiClient.invalidateQueries({ queryKey: ['posts'] }),
    });

  return {
    getPostsQuery,
    getPostQuery,
    getCreateMutation,
    getUpdateMutation,
    getDeleteMutation,
  };
};
