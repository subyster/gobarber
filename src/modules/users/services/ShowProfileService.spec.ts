import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Joao da Silva');
    expect(profile.email).toBe('joaosilva@hotmail.com');
  });

  it('should not be able to show non-existing profile', async () => {
    await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456',
    });

    await expect(
      showProfile.execute({
        user_id: 'wrong-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
