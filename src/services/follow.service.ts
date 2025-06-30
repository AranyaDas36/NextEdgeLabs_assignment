import User from '../models/User.model';
import FollowRequest from '../models/FollowRequest.model';
import { IUser } from '../interfaces/User.interface';
import { IFollowRequest, RequestStatus } from '../interfaces/FollowRequest.interface';
import { Types } from 'mongoose';

class FollowService {
  static async followUser(requesterId: string, recipientId: string): Promise<IUser | null> {
    await User.findByIdAndUpdate(requesterId, { $addToSet: { following: recipientId } });
    await User.findByIdAndUpdate(recipientId, { $addToSet: { followers: requesterId } });
    return User.findById(recipientId).select('-password');
  }

  static async unfollowUser(requesterId: string, recipientId: string): Promise<IUser | null> {
    await User.findByIdAndUpdate(requesterId, { $pull: { following: recipientId } });
    await User.findByIdAndUpdate(recipientId, { $pull: { followers: requesterId } });
    return User.findById(recipientId).select('-password');
  }

  static async sendFollowRequest(requesterId: string, recipientId: string): Promise<IFollowRequest> {
    const existing = await FollowRequest.findOne({ requester: requesterId, recipient: recipientId, status: 'pending' });
    if (existing) return existing;
    const request = new FollowRequest({ requester: requesterId, recipient: recipientId, status: 'pending' });
    await request.save();
    return request;
  }

  static async respondToFollowRequest(requestId: string, status: RequestStatus): Promise<IFollowRequest | null> {
    const request = await FollowRequest.findByIdAndUpdate(requestId, { status }, { new: true });
    if (request && status === 'accepted') {
      await User.findByIdAndUpdate(request.requester, { $addToSet: { following: request.recipient } });
      await User.findByIdAndUpdate(request.recipient, { $addToSet: { followers: request.requester } });
    }
    return request;
  }

  static async getFollowers(userId: string): Promise<IUser[]> {
    const user = await User.findById(userId).populate('followers', '-password');
    if (!user || !user.followers) return [];
    // Ensure all elements are IUser (populated), not ObjectId
    return (user.followers as any[]).filter(f => typeof f === 'object' && f.username) as IUser[];
  }

  static async getFollowing(userId: string): Promise<IUser[]> {
    const user = await User.findById(userId).populate('following', '-password');
    if (!user || !user.following) return [];
    // Ensure all elements are IUser (populated), not ObjectId
    return (user.following as any[]).filter(f => typeof f === 'object' && f.username) as IUser[];
  }

  static async getPendingFollowRequests(userId: string): Promise<IFollowRequest[]> {
    return FollowRequest.find({ recipient: userId, status: 'pending' }).populate('requester', 'username');
  }
}

export { FollowService }; 