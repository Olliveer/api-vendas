import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

class ListUserService {
  // eslint-disable-next-line class-methods-use-this
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRepository);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
