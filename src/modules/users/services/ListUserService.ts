import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UsersRepository';
import User from '../typeorm/entities/User';

class ListUserService {
  // eslint-disable-next-line class-methods-use-this
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRepository);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
