import type { FC } from 'react';
import { format, parseISO } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Link,
  Skeleton,
  Stack,
  type SxProps,
  Typography,
} from '@mui/material';

import { RouterLink } from '@/components/common';
import { useImageUrl } from '@/hooks';

type PostCardProps = {
  id: string;
  authorId: string;
  authorName: string;
  category: string;
  publishedAt: string;
  readTime: number;
  shortDescription: string;
  title: string;
  sx?: SxProps;
};

export const PostCard: FC<PostCardProps> = ({
  id,
  authorId,
  authorName,
  category,
  publishedAt,
  readTime,
  shortDescription,
  title,
  ...props
}) => {
  const formattedPublishedAt = format(parseISO(publishedAt), 'MMM d, yyyy');
  const cover = useImageUrl('posts', `cover-${id}`);
  const avatar = useImageUrl('avatars', authorId);

  return (
    <Card {...props}>
      <CardMedia
        component={RouterLink}
        href={`/blog/${id}`}
        sx={{ height: 280 }}
      >
        {!cover ? (
          <Skeleton
            component='div'
            height='100%'
          />
        ) : (
          <Box
            component='img'
            src={cover}
            alt='cover'
            sx={{
              width: '100%',
              objectPosition: 'center',
              objectFit: 'cover',
              height: '100%',
            }}
          />
        )}
      </CardMedia>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Chip label={category} />
        </Box>
        <Link
          color='text.primary'
          component={RouterLink}
          href={`/blog/${id}`}
          variant='h5'
        >
          {title}
        </Link>
        <Typography
          color='text.secondary'
          sx={{
            height: 48,
            mt: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
          variant='body1'
        >
          {shortDescription}
        </Typography>
        <Stack
          alignItems='center'
          direction='row'
          flexWrap='wrap'
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Stack
            alignItems='center'
            direction='row'
            spacing={2}
          >
            <Avatar src={avatar} />
            <Typography variant='subtitle2'>
              By {authorName} • {formattedPublishedAt}
            </Typography>
          </Stack>
          <Typography
            align='right'
            color='text.secondary'
            sx={{ flexGrow: 1 }}
            variant='body2'
          >
            {readTime} min read
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
