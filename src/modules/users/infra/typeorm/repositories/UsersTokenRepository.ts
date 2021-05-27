import { getRepository, Repository } from 'typeorm';
import { IUserTokensRepository } from '../../../domain/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UsersTokenRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokenRepository;
