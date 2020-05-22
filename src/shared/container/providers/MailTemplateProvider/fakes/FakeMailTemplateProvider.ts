import IMAilTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMAilTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
