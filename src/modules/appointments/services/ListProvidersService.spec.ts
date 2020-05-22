import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Joao dos Santos',
      email: 'joaosantos@hotmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Logged User',
      email: 'loggeduser@hotmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
