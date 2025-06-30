import { Document, Types } from 'mongoose';

export interface IPost extends Document {
  user: Types.ObjectId;
  content: string;
  caption?: string;
  tags?: string[];
  likes: Types.ObjectId[];
  archived: boolean;
  media?: {
    data: Buffer;
    contentType: string;
  };
  createdAt: Date;
  updatedAt: Date;
} 