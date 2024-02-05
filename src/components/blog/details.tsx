import type { FC } from 'react';
import { Avatar, Box, Chip, Container, Stack, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';

import { useImageUrl } from '@/hooks';
import { PostContent } from './content';
import { contentToReadtime } from '@/utils/calc';

type PostDetailsProps = {
  id: string;
  authorId: string;
  authorName: string | null;
  publishedAt: string;
  title: string;
  description: string;
  category: string;
  content: string;
};

export const PostDetails: FC<PostDetailsProps> = ({
  id,
  authorId,
  publishedAt,
  title,
  description,
  category,
  authorName,
  content,
}) => {
  const coverUrl = useImageUrl('posts', `cover-${id}`);
  const avatar = useImageUrl('avatars', authorId);
  const formattedPublishedAt = format(parseISO(publishedAt), 'MMMM d, yyyy');
  const readTime = contentToReadtime(content);
  return (
    <>
      <Stack spacing={3}>
        <div>
          <Chip label={category} />
        </div>
        <Typography variant='h3'>{title}</Typography>
        <Typography
          color='text.secondary'
          variant='subtitle1'
        >
          {description}
        </Typography>
        <Stack
          alignItems='center'
          direction='row'
          spacing={2}
          sx={{ mt: 3 }}
        >
          <Avatar src={avatar} />
          <div>
            <Typography variant='subtitle2'>
              By {authorName || 'Unknown User'} • {formattedPublishedAt}
            </Typography>
            <Typography
              color='text.secondary'
              variant='body2'
            >
              {readTime} min read
            </Typography>
          </div>
        </Stack>
      </Stack>
      <Box
        component='img'
        src={coverUrl || ''}
        crossOrigin='anonymous'
        alt='cover'
        sx={{
          width: '100%',
          objectPosition: 'center',
          objectFit: 'cover',
          borderRadius: 1,
          height: 380,
          mt: 3,
        }}
      />
      <Container sx={{ py: 3 }}>
        <PostContent content={content} />
      </Container>
    </>
  );
};
