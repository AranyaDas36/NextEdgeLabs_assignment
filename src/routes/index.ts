import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import followRoutes from './follow.routes';
import postRoutes from './post.routes';
import commentRoutes from './comment.routes';
import storyRoutes from './story.routes';
import mediaRoutes from './media.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/users', followRoutes);
router.use('/posts', postRoutes);
router.use('/', commentRoutes);
router.use('/stories', storyRoutes);
router.use('/media', mediaRoutes);

// Import and use feature routers here

export default router; 