import { Router } from 'express';
import { MediaController } from '../controllers/media.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/upload', authenticateJWT, upload.single('file'), MediaController.upload);
router.post('/upload/multiple', authenticateJWT, upload.array('files'), MediaController.uploadMultiple);
router.delete('/:mediaId', authenticateJWT, MediaController.delete);

export default router; 