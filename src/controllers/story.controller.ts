import { Request, Response, NextFunction } from 'express';
import { StoryService } from '../services/story.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class StoryController {
  static async createStory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) { res.status(400).json({ error: 'No media uploaded' }); return; }
      const { caption } = req.body;
      const media = { data: req.file.buffer, contentType: req.file.mimetype };
      const story = await StoryService.createStory(req.user.id, media, caption);
      res.status(201).json({ story });
    } catch (err) {
      next(err);
    }
  }

  static async getFeed(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stories = await StoryService.getFeed();
      res.json({ stories });
    } catch (err) {
      next(err);
    }
  }

  static async getUserStories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const stories = await StoryService.getUserStories(userId);
      res.json({ stories });
    } catch (err) {
      next(err);
    }
  }

  static async viewStory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { storyId } = req.params;
      const story = await StoryService.viewStory(storyId, req.user.id);
      res.json({ story });
    } catch (err) {
      next(err);
    }
  }

  static async deleteStory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { storyId } = req.params;
      await StoryService.deleteStory(storyId, req.user.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
} 