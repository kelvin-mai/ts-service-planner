import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';

import {
  type Post,
  type PostDTO,
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
} from '../post';
import { withInvalidate } from '../utils';

export const usePostsApi = () => {
  const getAllQuery = (page: number) =>
    useQuery<{ posts: any[]; hasNext: boolean }>({
      queryKey: ['posts', page],
      queryFn: () => fetchPosts(page),
    });

  const getQuery = (id: string) =>
    useQuery<{ post: Post }>({
      queryKey: ['posts', id],
      queryFn: () => fetchPost(id),
    });

  const getCreateMutation = (options?: UseMutationOptions<Post, Error, PostDTO>) =>
    useMutation<Post, Error, PostDTO>({
      ...options,
      mutationFn: (data: PostDTO) => createPost(data),
      onSuccess: withInvalidate(['posts'], options?.onSuccess),
    });

  const getUpdateMutation = (id: string, options?: UseMutationOptions<Post, Error, PostDTO>) =>
    useMutation<Post, Error, PostDTO>({
      ...options,
      mutationFn: (data: PostDTO) => updatePost(id, data),
      onSuccess: withInvalidate(['posts', id], options?.onSuccess),
    });

  const getDeleteMutation = (id: string, options?: UseMutationOptions<Post>) =>
    useMutation<Post>({
      ...options,
      mutationFn: () => deletePost(id),
      onSuccess: withInvalidate(['posts', id], options?.onSuccess),
    });

  return {
    getAllQuery,
    getQuery,
    getCreateMutation,
    getUpdateMutation,
    getDeleteMutation,
  };
};
