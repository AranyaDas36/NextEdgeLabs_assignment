import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, username, password } = req.body;
      const user = await AuthService.register(email, username, password);
      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.status(200).json({ user, token });
    } catch (err) {
      next(err);
    }
  }
} 