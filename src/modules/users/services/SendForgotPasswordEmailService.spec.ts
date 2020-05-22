import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover password with the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'joaosilva@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover password from non-existent user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'joaosilva@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'joaosilva@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
