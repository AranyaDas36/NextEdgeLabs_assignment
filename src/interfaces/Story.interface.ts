import { Document, Types } from 'mongoose';

export interface IStory extends Document {
  user: Types.ObjectId;
  media: {
    data: Buffer;
    contentType: string;
  };
  caption?: string;
  viewers: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
} 