import type { FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Avatar, Box, Button, OutlinedInput, Stack, Skeleton } from '@mui/material';

import { useAuth } from '@/hooks';
import { useStorage, useComments } from '@/hooks/api';

type PostCommentAddProps = {
  postId: string;
};

type CommentFieldValues = {
  content: string;
};

export const PostCommentAdd: FC<PostCommentAddProps> = ({ postId }) => {
  const { user, isPending } = useAuth();
  const { getCreateMutation } = useComments(postId);
  const { register, handleSubmit, reset } = useForm<CommentFieldValues>();
  const createMutation = getCreateMutation({
    onSettled: () => reset(),
  });
  if (!user) {
    return null;
  }
  const { getImageUrlQuery } = useStorage();
  const { data: avatar } = getImageUrlQuery('avatars', user.id);
  const submitFn: SubmitHandler<CommentFieldValues> = (data) => {
    createMutation.mutate({
      ...data,
      post_id: postId,
      author: user.id,
    });
  };

  return isPending ? (
    <Skeleton />
  ) : (
    <form onSubmit={handleSubmit(submitFn)}>
      <Stack
        alignItems='flex-start'
        direction='row'
        spacing={2}
      >
        <Avatar
          src={avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <OutlinedInput
            fullWidth
            multiline
            placeholder='Add a comment'
            rows={3}
            {...register('content')}
          />
          <Stack
            alignItems='center'
            direction='row'
            spacing={3}
            justifyContent='space-between'
            sx={{ mt: 3 }}
          >
            <Button
              variant='contained'
              type='submit'
              disabled={createMutation.isPending}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};
