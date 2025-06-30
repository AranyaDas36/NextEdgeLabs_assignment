import { Document, Types } from 'mongoose';

export interface IComment extends Document {
  post: Types.ObjectId;
  user: Types.ObjectId;
  content: string;
  parent?: Types.ObjectId;
  replies: Types.ObjectId[];
  likes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
} 