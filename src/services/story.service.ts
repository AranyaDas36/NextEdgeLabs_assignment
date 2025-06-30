import Story from '../models/Story.model';
import { Types } from 'mongoose';

class StoryService {
  static async createStory(userId: string, media: { data: Buffer; contentType: string }, caption?: string) {
    const story = new Story({ user: userId, media, caption });
    await story.save();
    return story;
  }

  static async getFeed(): Promise<any[]> {
    const stories = await Story.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$user',
          story: { $first: '$$ROOT' },
        },
      },
      { $replaceRoot: { newRoot: '$story' } },
    ]);
    return stories;
  }

  static async getUserStories(userId: string) {
    return Story.find({ user: userId }).sort({ createdAt: -1 });
  }

  static async viewStory(storyId: string, viewerId: string) {
    return Story.findByIdAndUpdate(storyId, { $addToSet: { viewers: viewerId } }, { new: true });
  }

  static async deleteStory(storyId: string, userId: string) {
    await Story.findOneAndDelete({ _id: storyId, user: userId });
  }
}

export { StoryService }; 