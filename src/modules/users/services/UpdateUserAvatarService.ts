import { getCustomRepository } from 'typeorm';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/errors/AppError';
import DiskStorageProvider from '../../../shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '../../../shared/providers/StorageProvider/S3StorageProvider';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequestUser {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  async execute({ user_id, avatarFileName }: IRequestUser): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }

      const fileName = await s3Provider.saveFile(avatarFileName);
      user.avatar = fileName;
    } else {
      const storageProvider = new DiskStorageProvider();
      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }
      const fileName = await storageProvider.saveFile(avatarFileName);
      user.avatar = fileName;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
