import { hash } from 'bcrypt';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IResetPassword } from '../domain/models/IResetPassword';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareTokenDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareTokenDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 10);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
