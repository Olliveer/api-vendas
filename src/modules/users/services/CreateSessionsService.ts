import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import UserRepository from '../repositories/UsersRepository';
import User from '../typeorm/entities/User';

interface IRequestUser {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
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

    return user;
  }
}

export default CreateSessionsService;
