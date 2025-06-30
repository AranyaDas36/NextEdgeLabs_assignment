import { Request, Response, NextFunction } from 'express';
import { PostService } from '../services/post.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class PostController {
  static async createPost(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { content, caption, tags } = req.body;
      let media;
      if (req.file) {
        media = { data: req.file.buffer, contentType: req.file.mimetype };
      }
      const post = await PostService.createPost(req.user.id, content, caption, tags, media);
      res.status(201).json({ post });
    } catch (err) {
      next(err);
    }
  }

  static async getFeed(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const posts = await PostService.getFeed(page, limit);
      res.json({ posts });
    } catch (err) {
      next(err);
    }
  }

  static async getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { postId } = req.params;
      const post = await PostService.getPostById(postId);
      res.json({ post });
    } catch (err) {
      next(err);
    }
  }

  static async updatePost(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { postId } = req.params;
      const update = req.body;
      const post = await PostService.updatePost(postId, update);
      res.json({ post });
    } catch (err) {
      next(err);
    }
  }

  static async deletePost(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { postId } = req.params;
      await PostService.deletePost(postId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  static async likePost(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { postId } = req.params;
      const post = await PostService.likePost(postId, req.user.id);
      res.json({ post });
    } catch (err) {
      next(err);
    }
  }

  static async getPostLikes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { postId } = req.params;
      const likes = await PostService.getPostLikes(postId);
      res.json({ likes });
    } catch (err) {
      next(err);
    }
  }

  static async getUserPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const posts = await PostService.getUserPosts(userId);
      res.json({ posts });
    } catch (err) {
      next(err);
    }
  }

  static async archivePost(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { postId } = req.params;
      const { archive } = req.body;
      const post = await PostService.archivePost(postId, archive);
      res.json({ post });
    } catch (err) {
      next(err);
    }
  }
} 