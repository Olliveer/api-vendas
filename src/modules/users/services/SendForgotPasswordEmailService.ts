/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import path from 'path';
import EtherealMail from '../../../config/mail/EtherealMail';
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

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/password/reset?token=${token.token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
