import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

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

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
