import DomainError from "../errors/domain.error";

export default class Name {
    private value: string;

    constructor(name: string) {
        if (!this.validateName(name)) throw new DomainError("Invalid name");
        this.value = name;
    }

    validateName(name: string) {
        return name && name.length > 0;
    }

    getValue() {
        return this.value;
    }
}