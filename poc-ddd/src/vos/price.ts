export default class Price {
    private _value: number;

    constructor(value: number) {
        if (!this.validate(value)) throw new Error("Price value must be greater or equal zero");
        this._value = value;
    }

    private validate(value: number) {
        return value && value >= 0;
    }

    getValue(): number {
        return this._value;
    }
}