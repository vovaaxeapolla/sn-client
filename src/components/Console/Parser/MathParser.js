import Token from "./Token/Token";
import TokenType from "./Token/TokenType";

export default class MathParser {
    pointer = 0;
    tokensList = [];
    TypesList = {
        NUMBER: new TokenType('NUMBER', '\\d*(\\.\\d*)?'),
        ADDITION: new TokenType('ADDITION', '\\+'),
        SUBSTRUCTION: new TokenType('SUBSTRUCTION', '-'),
        MULTIPLICATION: new TokenType('MULTIPLICATION', '\\*'),
        DIVISION: new TokenType('DIVISION', '\\/'),
        LPARENTHESIS: new TokenType('LPARENTHESIS', '\\('),
        RPARENTHESIS: new TokenType('RPARENTHESIS', '\\)'),
        FUNCTION: new TokenType('FUNCTION', '\\w*'),
        ARROW: new TokenType('ARROW', '\\^'),
        SPACE: new TokenType('SPACE', '\\s'),
    };

    start(text = '') {
        this.pointer = 0;
        this.tokensList = this.tokenize(text);
        return this.expression();
    }

    tokenize(text) {
        let pos = 0,
            tokens = [];
        const tokenTypeList = Object.values(this.TypesList);
        while (pos < text.length) {
            for (let i = 0; i < tokenTypeList.length; i++) {
                const tokenType = tokenTypeList[i];
                const regexp = new RegExp('^' + tokenType.regexp);
                const result = text.slice(pos).match(regexp);
                if (result && result[0]) {
                    tokens.push(new Token(tokenType, result[0]));
                    pos += result[0].length;
                    break;
                }
                if (i === tokenTypeList.length - 1) {
                    throw new Error();
                }
            }
        }
        return tokens.filter(token => token.type.name !== this.TypesList.SPACE.name);
    }

    expression() {
        if (this.pointer >= this.tokensList.length) {
            return 0;
        } else {
            let value = this.plusminus();
            if (value)
                return Number(Math.round(value + 'e' + 6) + 'e-' + 6);
            return value;
        }
    }

    plusminus() {
        let value = this.multdiv();
        while (true) {
            this.pointer++;
            let token = null;
            if (this.pointer < this.tokensList.length) {
                token = this.tokensList[this.pointer].type.name;
            }
            switch (token) {
                case this.TypesList.ADDITION.name:
                    this.pointer++;
                    value += this.multdiv();
                    break;
                case this.TypesList.SUBSTRUCTION.name:
                    this.pointer++;
                    value -= this.multdiv();
                    break;
                default:
                    this.pointer--;
                    return value;
            }
        }
    }

    multdiv() {
        let value = this.exponent();
        while (true) {
            this.pointer++;
            let token = null;
            if (this.pointer < this.tokensList.length) {
                token = this.tokensList[this.pointer].type.name;
            }
            switch (token) {
                case this.TypesList.LPARENTHESIS.name:
                    value *= this.factor();
                    break;
                case this.TypesList.MULTIPLICATION.name:
                    this.pointer++;
                    value *= this.exponent();
                    break;
                case this.TypesList.DIVISION.name:
                    this.pointer++;
                    value /= this.exponent();
                    break;
                default:
                    this.pointer--;
                    return value;
            }
        }
    }

    exponent() {
        let value = this.unaryminus();
        while (true) {
            this.pointer++;
            let token = null;
            if (this.pointer < this.tokensList.length) {
                token = this.tokensList[this.pointer].type.name;
            }
            switch (token) {
                case this.TypesList.ARROW.name:
                    this.pointer++;
                    value **= this.unaryminus();
                    break;
                default:
                    this.pointer--;
                    return value;
            }
        }
    }

    unaryminus() {
        if (this.tokensList[this.pointer].type.name === this.TypesList.SUBSTRUCTION.name) {
            this.pointer++;
            return -this.func();
        } else {
            return this.func();
        }
    }

    func() {
        if (this.tokensList[this.pointer].type.name === this.TypesList.FUNCTION.name) {
            switch (this.tokensList[this.pointer].text) {
                case 'sqrt':
                    this.pointer++;
                    return Math.sqrt(this.factor());
                case 'abs':
                    this.pointer++;
                    return Math.abs(this.factor());
                default:
                    return this.factor();
            }
        } else {
            return this.factor();
        }
    }

    factor() {
        switch (this.tokensList[this.pointer].type.name) {
            case this.TypesList.NUMBER.name:
                return +this.tokensList[this.pointer].text;
            case this.TypesList.LPARENTHESIS.name:
                this.pointer++;
                let value = this.expression();
                this.pointer++;
                let token = null;
                if (this.pointer < this.tokensList.length) {
                    token = this.tokensList[this.pointer].type.name;
                }
                if (token !== this.TypesList.RPARENTHESIS.name) {
                    throw new Error("Ожидалась закрывающая скобка!");
                }
                return value;
            default:
                throw new Error("Неудалось обработать токен!");
        }
    }
}
