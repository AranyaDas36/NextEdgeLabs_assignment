import { Document, Types } from 'mongoose';

export type RequestStatus = 'pending' | 'accepted' | 'rejected';

export interface IFollowRequest extends Document {
  requester: Types.ObjectId;
  recipient: Types.ObjectId;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
} 