import LineData, { LineType } from "../Line/LineData";
import CLIFunctions from "./CLIFunctions";
import TokenType from "./Token/TokenType";
import Token from "./Token/Token";

export default class CLIParser {

  private tokens: Token[] = [];
  private store: any = null;

  TypesList = {
    'FUNCTION': new TokenType('FUNCTION', new RegExp(`^[a-zA-Zа-яА-Я]+`)),
    'TEXT': new TokenType('TEXT', new RegExp(`^["'].*?["']`)),
    'FLAG': new TokenType('FLAG', new RegExp('^-[a-zA-Zа-яА-Я]')),
    'ARGUMENT': new TokenType('ARGUMENT', new RegExp('^\\$([a-z]|[A-Z]|[а-я]|[А-Я]|\\d)+')),
    'SPACE': new TokenType('SPACE', new RegExp('^\\s+')),
    'ERROR': new TokenType('ERROR', new RegExp('^')),
  };

  constructor(store: any) {
    this.store = store;
  }

  tokenize(text: string): Token[] {
    let pos = 0,
      tokens = [];
    const tokenTypeList = Object.values(this.TypesList);
    while (pos < text.length) {
      for (let i = 0; i < tokenTypeList.length; i++) {
        const tokenType = tokenTypeList[i];
        const regexp = tokenType.regexp;
        const result = text.slice(pos).match(regexp);
        if (result && result[0]) {
          let r = null;
          if (tokenType.name === this.TypesList.TEXT.name) {
            r = result[0].replace(/"|'|\$/g, '');
          } else {
            r = result[0].replace(/"|'|\$|-/g, '')
          }
          const token = new Token(tokenType, r);
          pos += result[0].length;
          tokens.push(token);
          break;
        }
        if (i === tokenTypeList.length - 1) {
          return [new Token(this.TypesList.ERROR, `Неизвестный токен ${pos}`)];
        }
      }
    }
    return tokens;
  }

  execute(tokens: Token[]) {

    if (tokens[0].type.name === this.TypesList.ERROR.name)
      return new LineData(LineType.ERROR, tokens.join('\n'));

    let pos = 1,
      fn = null,
      args = [],
      flags = [],
      texts = [];

    if (0 < tokens.length && tokens[0].type.name === this.TypesList.FUNCTION.name)
      fn = tokens[0].text;
    else
      return new LineData(LineType.ERROR, "Синтаксическая ошибка. Строка должна начинаться с функции!");

    while (pos < tokens.length) {
      switch (tokens[pos].type.name) {
        case this.TypesList.ARGUMENT.name:
          args.push(tokens[pos].text);
          break;
        case this.TypesList.FLAG.name:
          flags.push(tokens[pos].text);
          break;
        case this.TypesList.TEXT.name:
          texts.push(tokens[pos].text);
          break;
        default:
          break;
      }
      pos++;
    }

    const fns = Object.values(CLIFunctions);
    for (let i = 0; i < fns.length; i++)
      if (fns[i].name === fn)
        return CLIFunctions[fn as keyof typeof CLIFunctions]({ store: this.store, args: args, flags: flags, texts: texts });

    return new LineData(LineType.ERROR, `Что такое ${fn}? Я не знаю!`);
  }

  start(text: string) {
    this.tokens = this.tokenize(text);
    return this.execute(this.tokens.filter(token => token.type.name !== this.TypesList.SPACE.name));
  }

}
