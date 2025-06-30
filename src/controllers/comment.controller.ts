import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/comment.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class CommentController {
  static async addComment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { postId } = req.params;
      const { content, parent } = req.body;
      const comment = await CommentService.addComment(postId, req.user.id, content, parent);
      res.status(201).json({ comment });
    } catch (err) {
      next(err);
    }
  }

  static async getComments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { postId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const comments = await CommentService.getComments(postId, page, limit);
      res.json({ comments });
    } catch (err) {
      next(err);
    }
  }

  static async updateComment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const comment = await CommentService.updateComment(commentId, req.user.id, content);
      res.json({ comment });
    } catch (err) {
      next(err);
    }
  }

  static async deleteComment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { commentId } = req.params;
      await CommentService.deleteComment(commentId, req.user.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  static async likeComment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { commentId } = req.params;
      const comment = await CommentService.likeComment(commentId, req.user.id);
      res.json({ comment });
    } catch (err) {
      next(err);
    }
  }

  static async replyToComment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { commentId } = req.params;
      const { postId, content } = req.body;
      const comment = await CommentService.replyToComment(postId, req.user.id, content, commentId);
      res.status(201).json({ comment });
    } catch (err) {
      next(err);
    }
  }
} 