import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMAilTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
