import mongoose, { Schema } from 'mongoose';
import { IMedia } from '../interfaces/Media.interface';

const MediaSchema: Schema<IMedia> = new Schema<IMedia>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: Buffer,
  contentType: String,
  originalName: String,
}, { timestamps: true });

export default mongoose.model<IMedia>('Media', MediaSchema); 