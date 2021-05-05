/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

interface IRequestUser {
  email: string;
}

class SendForgotPasswordEmailService {
  async execute({ email }: IRequestUser): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);

    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await userTokenRepository.generate(user.id);

    console.log('SERVICE', token);
  }
}

export default SendForgotPasswordEmailService;
