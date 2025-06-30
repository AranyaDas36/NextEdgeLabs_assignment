import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  avatar?: {
    data: Buffer;
    contentType: string;
  };
  followers: Types.ObjectId[] | IUser[];
  following: Types.ObjectId[] | IUser[];
  createdAt: Date;
  updatedAt: Date;
} 