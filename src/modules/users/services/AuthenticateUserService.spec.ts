import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'joaosilva@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate a non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'joaosilva@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'joaosilva@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
