"use strict";

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeMailProvider;
let fakeUserTokensRepository;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUserRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it('should be able to recover password with the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'joaosilva@gmail.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover password from non-existent user', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'joaosilva@gmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'joaosilva@gmail.com'
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});