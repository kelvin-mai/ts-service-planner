import type { FC } from 'react';
import Markdown from 'react-markdown';
import { styled } from '@mui/material';

import { Code } from '@/components/common';

const PostContentRoot = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  '& code': {
    color: theme.palette.primary.main,
    fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
    fontSize: 14,
    paddingLeft: 2,
    paddingRight: 2,
  },
  '& h2': {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: theme.typography.h5.lineHeight,
    marginBottom: theme.spacing(3),
  },
  '& h3': {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: theme.typography.h3.lineHeight,
    marginBottom: theme.spacing(3),
  },
  '& p': {
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    marginBottom: theme.spacing(2),
  },
  '& li': {
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    marginBottom: theme.spacing(1),
  },
}));

type PostContentProps = {
  content: string;
};

export const PostContent: FC<PostContentProps> = ({ content }) => {
  return (
    <PostContentRoot>
      <Markdown components={{ code: Code }}>{content}</Markdown>
    </PostContentRoot>
  );
};
