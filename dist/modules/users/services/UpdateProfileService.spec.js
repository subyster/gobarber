"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUserRepository, fakeHashProvider);
  });
  it('should be able to update profile information', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Joao dos Santos',
      email: 'joaosantos@hotmail.com'
    });
    expect(updatedUser.name).toBe('Joao dos Santos');
    expect(updatedUser.email).toBe('joaosantos@hotmail.com');
  });
  it('should not be able to update profile from non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Test',
      email: 'test@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456'
    });
    const user = await fakeUserRepository.create({
      name: 'Joao dos Santos',
      email: 'joaosantos@hotmail.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Joao dos Santos',
      email: 'joaosantos@hotmail.com',
      old_password: '123456',
      password: '123123'
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Joao dos Santos',
      email: 'joaosantos@hotmail.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Joao dos Santos',
      email: 'joaosantos@hotmail.com',
      old_password: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});