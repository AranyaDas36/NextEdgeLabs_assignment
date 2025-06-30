import mongoose, { Schema } from 'mongoose';
import { IFollowRequest } from '../interfaces/FollowRequest.interface';

const FollowRequestSchema: Schema<IFollowRequest> = new Schema<IFollowRequest>({
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<IFollowRequest>('FollowRequest', FollowRequestSchema); 