import { inject, injectable } from 'tsyringe';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/errors/AppError';
import DiskStorageProvider from '../../../shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '../../../shared/providers/StorageProvider/S3StorageProvider';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatarFileName }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
