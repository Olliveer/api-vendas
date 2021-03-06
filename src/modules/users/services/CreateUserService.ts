import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

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

    const hashedPassword = await hash(password, 10);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
