import mongoose, { Schema } from 'mongoose';
import { IStory } from '../interfaces/Story.interface';

const StorySchema: Schema<IStory> = new Schema<IStory>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  media: {
    data: Buffer,
    contentType: String,
  },
  caption: { type: String },
  viewers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
}, { timestamps: true });

export default mongoose.model<IStory>('Story', StorySchema); 