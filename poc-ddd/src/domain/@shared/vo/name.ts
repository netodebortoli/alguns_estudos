import Entity from "../entity/abstract-entity";

export default class Name {
    private value!: string;

    constructor(name: string, entity?: Entity) {
        if (!this.validateName(name)) {
            entity?.notification.addError({context: entity.constructor.name, message: 'Invalid name'})
            return;
        }
        this.value = name;
    }

    validateName(name: string) {
        return name && name.length > 0;
    }

    getValue() {
        return this.value;
    }
}