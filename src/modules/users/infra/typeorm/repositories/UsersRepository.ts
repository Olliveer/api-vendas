import { getRepository, Like, Repository } from 'typeorm';
import { ICreateUser } from '../../../domain/models/ICreateUser';
import { IPaginateUser } from '../../../domain/models/IPaginateUser';
import { IUsersRepository } from '../../../domain/repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  async findAllPaginate(
    search: string,
    sortField: string,
  ): Promise<IPaginateUser> {
    let users;

    if (search) {
      users = await this.ormRepository
        .createQueryBuilder()
        .where([{ name: Like(`%${search}%`) }, { email: Like(`%${search}%`) }])
        .orderBy(sortField)
        .paginate();
    } else {
      users = await this.ormRepository
        .createQueryBuilder()
        .orderBy(sortField)
        .paginate();
    }

    return users as IPaginateUser;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }
}

export default UsersRepository;
