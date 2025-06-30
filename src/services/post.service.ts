import Post from '../models/Post.model';
import { IPost } from '../interfaces/Post.interface';
import { Types } from 'mongoose';

export class PostService {
  static async createPost(userId: string, content: string, caption?: string, tags?: string[], media?: { data: Buffer; contentType: string }): Promise<IPost> {
    const post = new Post({ user: userId, content, caption, tags, media });
    await post.save();
    return post;
  }

  static async getFeed(page = 1, limit = 10): Promise<IPost[]> {
    return Post.find({ archived: false })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user', 'username');
  }

  static async getPostById(postId: string): Promise<IPost | null> {
    return Post.findById(postId).populate('user', 'username');
  }

  static async updatePost(postId: string, update: Partial<IPost>): Promise<IPost | null> {
    return Post.findByIdAndUpdate(postId, update, { new: true });
  }

  static async deletePost(postId: string): Promise<void> {
    await Post.findByIdAndDelete(postId);
  }

  static async likePost(postId: string, userId: string): Promise<IPost | null> {
    const post = await Post.findById(postId);
    if (!post) return null;
    const index = post.likes.findIndex((id) => id.equals(userId));
    if (index === -1) {
      post.likes.push(new Types.ObjectId(userId));
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    return post;
  }

  static async getPostLikes(postId: string): Promise<Types.ObjectId[]> {
    const post = await Post.findById(postId);
    return post ? post.likes : [];
  }

  static async getUserPosts(userId: string): Promise<IPost[]> {
    return Post.find({ user: userId }).sort({ createdAt: -1 });
  }

  static async archivePost(postId: string, archive: boolean): Promise<IPost | null> {
    return Post.findByIdAndUpdate(postId, { archived: archive }, { new: true });
  }
} 