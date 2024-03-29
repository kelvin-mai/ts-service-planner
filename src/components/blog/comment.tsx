import type { FC } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Avatar, Box, Link, Stack, Typography } from '@mui/material';

import { useAuth } from '@/hooks';
import { useComments, useStorage } from '@/hooks/api';
import { Comment } from '@/api/comment';

type PostCommentProps = Comment & { postAuthor?: string };

export const PostComment: FC<PostCommentProps> = ({
  id,
  post_id,
  author,
  content,
  created_at,
  postAuthor,
}) => {
  const { getImageUrlQuery } = useStorage();
  const { data: avatar } = getImageUrlQuery('avatars', author.id);
  const { isAuthorized } = useAuth();
  const canDelete = isAuthorized(author.id) || isAuthorized(postAuthor);
  const { getDeleteMutation } = useComments(post_id);
  const deleteMutation = getDeleteMutation(id);
  return (
    <Stack
      alignItems='flex-start'
      direction='row'
      spacing={2}
    >
      <Avatar src={avatar} />
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'neutral.900' : 'neutral.100',
          borderRadius: 1,
          p: 2,
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Stack
            alignItems='flex-end'
            direction='row'
            spacing={1}
          >
            <Typography variant='subtitle2'>{author.full_name}</Typography>
            {canDelete ? (
              <Link
                component='button'
                color='inherit'
                underline='hover'
                variant='caption'
                onClick={() => deleteMutation.mutate()}
              >
                delete
              </Link>
            ) : null}
          </Stack>
          <Typography
            color='text.secondary'
            variant='caption'
          >
            {formatDistanceToNow(parseISO(created_at), { addSuffix: true })}
          </Typography>
        </Box>
        <Typography
          variant='body2'
          sx={{ mt: 1 }}
        >
          {content}
        </Typography>
      </Box>
    </Stack>
  );
};
