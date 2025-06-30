import User from '../models/User.model';
import { IUser } from '../interfaces/User.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/app.config';

export class AuthService {
  static async register(email: string, username: string, password: string): Promise<IUser> {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) throw new Error('Email or username already in use');
    const user = new User({ email, username, password });
    await user.save();
    return user;
  }

  static async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return { user, token };
  }
} 