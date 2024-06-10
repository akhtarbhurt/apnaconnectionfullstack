import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { blogsController, deleteBlogsController, getBlogsController, updateBlogsController } from '../controllers/blogs.controllers.js';

const router = express.Router();

router.post('/blog', upload.single('blogImage'), blogsController);
router.get('/blog', getBlogsController);
router.delete('/blog/:id', deleteBlogsController);
router.put("/blog/:id", upload.single('blogImage'), updateBlogsController );

export default router;
