/* eslint-disable class-methods-use-this */
import handlebars from 'handlebars';

interface ITemplateVariable{
  [key: string]: string | number;
}

interface IParseEmailTemplate {
  template: string;
  variables: ITemplateVariable;
}

class HandleBarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseEmailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
export default HandleBarsMailTemplate;
