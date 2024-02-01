import type { RequestHandler } from 'express';

import { prisma } from '@/lib/prisma';

export const getComments: RequestHandler = async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: { postId: req.params.postId },
    orderBy: { created: 'desc' },
  });
  return res.json({ comments });
};

export const createComment: RequestHandler = async (req, res) => {
  const data = { ...req.body, postId: req.params.id };
  const comment = await prisma.comment.create({
    data,
  });
  return res.json({ comment });
};

export const deleteComment: RequestHandler = async (req, res) => {
  const comment = await prisma.comment.delete({
    where: {
      id: req.params.id,
    },
  });
  return res.json({ comment });
};
