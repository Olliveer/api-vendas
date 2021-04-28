import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';
import UserRepository from '../repositories/UsersRepository';
import User from '../typeorm/entities/User';

interface IRequestUser {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  // eslint-disable-next-line class-methods-use-this
  async execute({ email, password }: IRequestUser): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const checkHash = await compare(password, user.password);

    if (!checkHash) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    console.log(token);

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
