import User from '../models/User.model';
import { IUser } from '../interfaces/User.interface';
import Post from '../models/Post.model';
import { IPost } from '../interfaces/Post.interface';

export class UserService {
  static async getProfile(userId: string): Promise<IUser | null> {
    return User.findById(userId).select('-password');
  }

  static async updateProfile(userId: string, update: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, update, { new: true }).select('-password');
  }

  static async uploadAvatar(userId: string, buffer: Buffer, mimetype: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, { avatar: { data: buffer, contentType: mimetype } }, { new: true }).select('-password');
  }

  static async searchUsers(query: string): Promise<IUser[]> {
    return User.find({ username: { $regex: query, $options: 'i' } }).select('-password');
  }

  static async getUserByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username }).select('-password');
  }

  static async getUserPosts(userId: string): Promise<IPost[]> {
    return Post.find({ user: userId }).sort({ createdAt: -1 });
  }

  static async deleteUser(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
} 