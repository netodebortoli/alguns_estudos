import Entity from "../../@shared/entity/abstract-entity";

export default class Price {
    private _value!: number;

    constructor(value: number, entity?: Entity) {
        if (!this.validate(value)) {
            entity?.notification.addError({context: entity.constructor.name, message: "Price value must be greater or equal zero"})
            return;
        } 
        this._value = value;
    }

    private validate(value: number) {
        return value && value >= 0;
    }

    getValue(): number {
        return this._value;
    }
}