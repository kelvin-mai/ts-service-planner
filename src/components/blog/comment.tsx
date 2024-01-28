import type { FC } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, Box, Stack, Typography } from '@mui/material';

type PostCommentProps = {
  authorAvatar: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: number;
  isLiked: boolean;
  likes: number;
};

export const PostComment: FC<PostCommentProps> = ({
  authorAvatar,
  authorName,
  authorRole,
  content,
  createdAt,
  ...props
}) => {
  return (
    <Stack
      alignItems='flex-start'
      direction='row'
      spacing={2}
      {...props}
    >
      <Avatar src={authorAvatar} />
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
          <Typography variant='subtitle2'>{authorName}</Typography>
          <Typography
            color='text.secondary'
            variant='caption'
          >
            {formatDistanceToNow(createdAt, { addSuffix: true })}
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
