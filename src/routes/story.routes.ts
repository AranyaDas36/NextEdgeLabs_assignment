import { Router } from 'express';
import { StoryController } from '../controllers/story.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/', authenticateJWT, upload.single('media'), StoryController.createStory);
router.get('/', StoryController.getFeed);
router.get('/user/:userId', StoryController.getUserStories);
router.post('/:storyId/view', authenticateJWT, StoryController.viewStory);
router.delete('/:storyId', authenticateJWT, StoryController.deleteStory);

export default router; 