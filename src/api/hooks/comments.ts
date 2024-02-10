import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';

import {
  type Comment,
  type CommentDTO,
  getComments,
  createComment,
  deleteComment,
} from '../comment';
import { withInvalidate } from '../utils';

export const useCommentsApi = (post_id: string) => {
  const queryKey = ['posts', post_id, 'comments'];

  const getAllQuery = () =>
    useQuery({
      queryKey,
      queryFn: () => getComments(post_id),
    });

  const getCreateMutation = (options?: UseMutationOptions<Comment, Error, CommentDTO>) =>
    useMutation<Comment, Error, CommentDTO>({
      ...options,
      mutationFn: (data) => createComment(data),
      onSuccess: withInvalidate(queryKey, options?.onSuccess),
    });

  const getDeleteMutation = (id: string, options?: UseMutationOptions<Comment, Error>) =>
    useMutation<Comment, Error>({
      ...options,
      mutationFn: () => deleteComment(id),
      onSuccess: withInvalidate(queryKey, options?.onSuccess),
    });

  return {
    getAllQuery,
    getCreateMutation,
    getDeleteMutation,
  };
};
