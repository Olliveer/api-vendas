/* eslint-disable class-methods-use-this */
import { hash } from 'bcrypt';
import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

interface IRequestUser {
  token: string;
  password: string;
}

class ResetPasswordService {
  async execute({ token, password }: IRequestUser): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);

    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareTokenDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareTokenDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 10);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
