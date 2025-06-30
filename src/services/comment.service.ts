import Comment from '../models/Comment.model';
import { Types } from 'mongoose';

class CommentService {
  static async addComment(postId: string, userId: string, content: string, parent?: string) {
    const comment = new Comment({ post: postId, user: userId, content, parent });
    await comment.save();
    if (parent) {
      await Comment.findByIdAndUpdate(parent, { $push: { replies: comment._id } });
    }
    return comment;
  }

  static async getComments(postId: string, page = 1, limit = 10) {
    return Comment.find({ post: postId, parent: null })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user', 'username')
      .populate({ path: 'replies', populate: { path: 'user', select: 'username' } });
  }

  static async updateComment(commentId: string, userId: string, content: string) {
    return Comment.findOneAndUpdate({ _id: commentId, user: userId }, { content }, { new: true });
  }

  static async deleteComment(commentId: string, userId: string) {
    await Comment.findOneAndDelete({ _id: commentId, user: userId });
  }

  static async likeComment(commentId: string, userId: string) {
    const comment = await Comment.findById(commentId);
    if (!comment) return null;
    const index = comment.likes.findIndex((id) => id.equals(userId));
    if (index === -1) {
      comment.likes.push(new Types.ObjectId(userId));
    } else {
      comment.likes.splice(index, 1);
    }
    await comment.save();
    return comment;
  }

  static async replyToComment(postId: string, userId: string, content: string, parent: string) {
    return this.addComment(postId, userId, content, parent);
  }
}

export { CommentService }; 