"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeUserTokensRepository;
let resetPassword;
let fakeHashProvider;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUserRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should be able to reset password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      password: '123123',
      token
    });
    const updatedUser = await fakeUserRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe('123123');
  });
  it('should not be able to reset the password with non-existing token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password with non-existing user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('non-existing-user');
    await expect(resetPassword.execute({
      token,
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset password 2 hours after sending email', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      password: '123123',
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});