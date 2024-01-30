import express from 'express';

import { getPosts, getPost, createPost, updatePost, deletePost } from './post/handler';

export const router = express.Router();

router.route('/api').get((_, res) => {
  res.json({ ok: true });
});

router.route('/api/post').get(getPosts).post(createPost);
router.route('/api/post/:id').get(getPost).put(updatePost).delete(deletePost);
