import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import UserRepository from '../repositories/UsersRepository';
import User from '../typeorm/entities/User';

interface IRequestUser {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  // eslint-disable-next-line class-methods-use-this
  async execute({ name, email, password }: IRequestUser): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
