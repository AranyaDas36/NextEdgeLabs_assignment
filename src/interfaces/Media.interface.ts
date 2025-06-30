import { Document, Types } from 'mongoose';

export interface IMedia extends Document {
  user: Types.ObjectId;
  data: Buffer;
  contentType: string;
  originalName: string;
  createdAt: Date;
  updatedAt: Date;
} 