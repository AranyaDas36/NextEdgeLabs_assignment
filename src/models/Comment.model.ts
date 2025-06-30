import mongoose, { Schema } from 'mongoose';
import { IComment } from '../interfaces/Comment.interface';

const CommentSchema: Schema<IComment> = new Schema<IComment>({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
  parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
}, { timestamps: true });

export default mongoose.model<IComment>('Comment', CommentSchema); 