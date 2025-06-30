import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/User.interface';

const UserSchema: Schema<IUser> = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    data: Buffer,
    contentType: String,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model<IUser>('User', UserSchema); 