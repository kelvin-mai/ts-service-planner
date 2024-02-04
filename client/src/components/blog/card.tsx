import type { FC } from 'react';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Link,
  Stack,
  Typography,
  type SxProps,
} from '@mui/material';

import { RouterLink } from '@/components/common';
import { useImageUrl } from '@/hooks';

type PostCardProps = {
  id: string;
  authorAvatar?: string;
  authorName?: string;
  category: string;
  publishedAt?: number;
  readTime: number;
  shortDescription: string;
  sx?: SxProps;
  title: string;
};

export const PostCard: FC<PostCardProps> = ({
  id,
  authorAvatar = '/assets/avatars/avatar-jie-yan-song.png',
  authorName = 'Jie Yan Song',
  category,
  publishedAt = Date.now(),
  readTime,
  shortDescription,
  title,
  ...props
}) => {
  const formattedPublishedAt = format(publishedAt, 'MMM d, yyyy');
  const cover = useImageUrl('posts', `cover-${id}`);

  const getInitials = (name = ''): string =>
    name
      .replace(/\s+/, ' ')
      .split(' ')
      .slice(0, 2)
      .map((v) => v && v[0].toUpperCase())
      .join('');

  return (
    <Card {...props}>
      <CardMedia
        component={RouterLink}
        href={`/blog/${id}`}
        sx={{ height: 280 }}
      >
        <Box
          component='img'
          src={cover}
          crossOrigin='anonymous'
          alt='cover'
          sx={{
            width: '100%',
            objectPosition: 'center',
            objectFit: 'cover',
            height: '100%',
          }}
        />
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
            <Avatar src={authorAvatar}>{getInitials(authorName)}</Avatar>
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
