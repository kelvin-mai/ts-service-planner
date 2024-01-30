import { RequestHandler } from 'express';

import { prisma } from '../../lib/prisma';

export const getPosts: RequestHandler = async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' },
  });
  return res.json({ posts });
};

export const createPost: RequestHandler = async (req, res) => {
  const data = req.body;
  const post = await prisma.post.create({ data });
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
  const data = req.body;
  const post = await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data,
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