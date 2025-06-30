import Media from '../models/Media.model';

export class MediaService {
  static async upload(userId: string, file: Express.Multer.File) {
    const media = new Media({
      user: userId,
      data: file.buffer,
      contentType: file.mimetype,
      originalName: file.originalname,
    });
    await media.save();
    return media;
  }

  static async uploadMultiple(userId: string, files: Express.Multer.File[]) {
    const mediaDocs = files.map(file => ({
      user: userId,
      data: file.buffer,
      contentType: file.mimetype,
      originalName: file.originalname,
    }));
    const media = await Media.insertMany(mediaDocs);
    return media;
  }

  static async delete(mediaId: string, userId: string) {
    await Media.findOneAndDelete({ _id: mediaId, user: userId });
  }
} 