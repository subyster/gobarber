import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update profile information', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Joao dos Santos',
      email: 'joaosantos@hotmail.com',
    });

    expect(updatedUser.name).toBe('Joao dos Santos');
    expect(updatedUser.email).toBe('joaosantos@hotmail.com');
  });

  it('should not be able to update profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Joao dos Santos',
      email: 'joaosantos@hotmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joao da Silva',
        email: 'joaosilva@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Joao dos Santos',
      email: 'joaosantos@hotmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joao dos Santos',
        email: 'joaosantos@hotmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joao dos Santos',
        email: 'joaosantos@hotmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
