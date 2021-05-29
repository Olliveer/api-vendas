import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: ICreateUser): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const checkHash = await this.hashProvider.compareHash(password, user.password);

    if (!checkHash) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const token = sign({}, process.env.APP_JWT_SECRET as string, {
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
