import { Request, Response, NextFunction } from 'express';
import { MediaService } from '../services/media.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class MediaController {
  static async upload(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) { res.status(400).json({ error: 'No file uploaded' }); return; }
      const media = await MediaService.upload(req.user.id, req.file);
      res.status(201).json({ media });
    } catch (err) {
      next(err);
    }
  }

  static async uploadMultiple(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.files || !Array.isArray(req.files)) { res.status(400).json({ error: 'No files uploaded' }); return; }
      const media = await MediaService.uploadMultiple(req.user.id, req.files as Express.Multer.File[]);
      res.status(201).json({ media });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { mediaId } = req.params;
      await MediaService.delete(mediaId, req.user.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
} 