export default class TokenType {
    public name: string;
    public regexp: RegExp;
    constructor(name: string, regexp: RegExp) {
        this.name = name;
        this.regexp = regexp;
    }
}
