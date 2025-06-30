import { Router } from 'express';
import { FollowController } from '../controllers/follow.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();


router.post('/:userId/follow', authenticateJWT, FollowController.followUser);
router.post('/:userId/unfollow', authenticateJWT, FollowController.unfollowUser);
router.get('/:userId/followers', FollowController.getFollowers);
router.get('/:userId/following', FollowController.getFollowing);
router.post('/follow-request', authenticateJWT, FollowController.sendFollowRequest);
router.put('/follow-requests/:requestId', authenticateJWT, FollowController.respondToFollowRequest);
router.get('/follow-requests', authenticateJWT, FollowController.getPendingFollowRequests);

export default router; 