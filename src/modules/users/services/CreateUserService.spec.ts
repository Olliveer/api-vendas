import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new User', async () => {
    const User = await createUser.execute({
      name: 'Fake User',
      email: 'fake@mail.com',
      password: '123',
    });

    expect(User).toHaveProperty('id');
  });

  it('should not be able to create two Users with the same email', async () => {
    await createUser.execute({
      name: 'Fake User',
      email: 'fake@mail.com',
      password: '123',
    });

    expect(createUser.execute({
      name: 'Fake User',
      email: 'fake@mail.com',
      password: '123',
    })).rejects.toBeInstanceOf(AppError);
  });
});
