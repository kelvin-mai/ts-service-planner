import type { RequestHandler } from 'express';

import { prisma } from '@/lib/prisma';

export const getPosts: RequestHandler = async (req, res) => {
  const page = parseInt((req.query.page as string) || '1') - 1;
  const posts = await prisma.post.findMany({
    take: 4,
    skip: page * 4,
    orderBy: { publishedAt: 'desc' },
  });
  const total = await prisma.post.count();
  const hasNext = total > page * 4 + 4;
  return res.json({ posts, hasNext });
};

export const createPost: RequestHandler = async (req, res) => {
  const { category, content, description, title } = req.body;

  const post = await prisma.post.create({
    data: {
      category,
      content,
      description,
      title,
    },
  });

  return res.json({ post });
};

export const getPost: RequestHandler = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });

  return res.json({ post });
};

export const updatePost: RequestHandler = async (req, res) => {
  const { category, content, description, title } = req.body;
  const post = await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data: { category, content, description, title },
  });

  return res.json({ post });
};

export const deletePost: RequestHandler = async (req, res) => {
  const post = await prisma.post.delete({
    where: {
      id: req.params.id,
    },
  });
  return res.json({ post });
};
