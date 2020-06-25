"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeHashProvider;
let createUser;
let fakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUserRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a user with registered email', async () => {
    await createUser.execute({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456'
    });
    await expect(createUser.execute({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});