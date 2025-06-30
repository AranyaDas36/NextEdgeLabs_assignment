import { Request, Response, NextFunction } from 'express';
import { FollowService } from '../services/follow.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { RequestStatus } from '../interfaces/FollowRequest.interface';

export class FollowController {
  static async followUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await FollowService.followUser(req.user.id, userId);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async unfollowUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await FollowService.unfollowUser(req.user.id, userId);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async sendFollowRequest(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { recipientId } = req.body;
      const request = await FollowService.sendFollowRequest(req.user.id, recipientId);
      res.json({ request });
    } catch (err) {
      next(err);
    }
  }

  static async respondToFollowRequest(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { requestId } = req.params;
      const { status } = req.body;
      const request = await FollowService.respondToFollowRequest(requestId, status as RequestStatus);
      res.json({ request });
    } catch (err) {
      next(err);
    }
  }

  static async getFollowers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const followers = await FollowService.getFollowers(userId);
      res.json({ followers });
    } catch (err) {
      next(err);
    }
  }

  static async getFollowing(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const following = await FollowService.getFollowing(userId);
      res.json({ following });
    } catch (err) {
      next(err);
    }
  }

  static async getPendingFollowRequests(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const requests = await FollowService.getPendingFollowRequests(req.user.id);
      res.json({ requests });
    } catch (err) {
      next(err);
    }
  }
} 