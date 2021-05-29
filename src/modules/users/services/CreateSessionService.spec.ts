import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from './CreateSessionsService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fake user',
      email: 'fake@mail.com',
      password: '123',
    });

    const response = await createSession.execute({
      email: 'fake@mail.com',
      password: '123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  // it('should not be able to create two Users with the same email', async () => {
  //   await createUser.execute({
  //     name: 'Fake User',
  //     email: 'fake@mail.com',
  //     password: '123',
  //   });

  //   expect(createUser.execute({
  //     name: 'Fake User',
  //     email: 'fake@mail.com',
  //     password: '123',
  //   })).rejects.toBeInstanceOf(AppError);
  // });
});
