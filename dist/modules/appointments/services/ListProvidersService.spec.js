"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUserRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUserRepository"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let listProviders;
let fakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(fakeUserRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456'
    });
    const user2 = await fakeUserRepository.create({
      name: 'Joao dos Santos',
      email: 'joaosantos@hotmail.com',
      password: '123456'
    });
    const loggedUser = await fakeUserRepository.create({
      name: 'Logged User',
      email: 'loggeduser@hotmail.com',
      password: '123456'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});