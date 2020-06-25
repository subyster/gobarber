"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let showProfile;
describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    showProfile = new _ShowProfileService.default(fakeUserRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('Joao da Silva');
    expect(profile.email).toBe('joaosilva@hotmail.com');
  });
  it('should not be able to show non-existing profile', async () => {
    await fakeUserRepository.create({
      name: 'Joao da Silva',
      email: 'joaosilva@hotmail.com',
      password: '123456'
    });
    await expect(showProfile.execute({
      user_id: 'wrong-user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});