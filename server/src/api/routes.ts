import express from 'express';
import multer, { memoryStorage } from 'multer';

import { deleteFile, getFileURL, uploadFile } from '@/lib/minio';
import { getPosts, getPost, createPost, updatePost, deletePost } from './post/handler';
import { deleteComment, getComments } from './comment/handler';

export const router = express.Router();

router.route('/api').get((_, res) => {
  res.json({ ok: true });
});

router.route('/api/post').get(getPosts).post(createPost);
router.route('/api/post/:id').get(getPost).put(updatePost).delete(deletePost);
router.route('/api/post/:postId/comment').get(getComments);
router.route('/api/post/:postId/comment/:id').delete(deleteComment);

router
  .route('/api/file/:filename')
  .get(async (req, res) => {
    try {
      const fileUrl = await getFileURL(req.params.filename);
      return res.redirect(fileUrl);
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  })
  .post(multer({ storage: memoryStorage() }).single('file'), async (req, res) => {
    if (req.file?.buffer) {
      await uploadFile(req.params.filename, req.file?.buffer);
      return res.json({ success: true });
    }
    return res.status(500).json({ success: false });
  })
  .delete(async (req, res) => {
    await deleteFile(req.params.filename);
    return res.json({ success: true });
  });
