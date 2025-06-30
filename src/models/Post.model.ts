import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from '../interfaces/Post.interface';

const PostSchema: Schema<IPost> = new Schema<IPost>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  caption: { type: String },
  tags: [{ type: String }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  archived: { type: Boolean, default: false },
  media: {
    data: Buffer,
    contentType: String,
  },
}, { timestamps: true });

export default mongoose.model<IPost>('Post', PostSchema); 