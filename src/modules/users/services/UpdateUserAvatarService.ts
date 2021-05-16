/* eslint-disable camelcase */
import path from 'path';
import { getCustomRepository } from 'typeorm';
import fs from 'fs';
import AppError from '../../../shared/errors/AppError';
import User from '../typeorm/entities/User';
import uploadConfig from '../../../config/upload';
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

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
