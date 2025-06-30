import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class UserController {
  static async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.getProfile(req.user.id);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.updateProfile(req.user.id, req.body);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async uploadAvatar(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) { res.status(400).json({ error: 'No file uploaded' }); return; }
      const user = await UserService.uploadAvatar(req.user.id, req.file.buffer, req.file.mimetype);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async searchUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q } = req.query;
      const users = await UserService.searchUsers(q as string);
      res.json({ users });
    } catch (err) {
      next(err);
    }
  }

  static async getUserByUsername(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username } = req.params;
      const user = await UserService.getUserByUsername(username);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async getUserPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const posts = await UserService.getUserPosts(userId);
      res.json({ posts });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await UserService.deleteUser(req.user.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
} 