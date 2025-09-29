import Entity from "../entity/abstract-entity";

export default class UUID {
    private value!: string;

    constructor(uuid: string, entity?: Entity) {
        if (!this.validateUUID(uuid)) {
            entity?.notification.addError({ context: entity.constructor.name, message: 'Invalid UUID' });
            return;
        }
        this.value = uuid;
    }

    static create() {
        return new UUID(crypto.randomUUID());
    }

    validateUUID(uuid: string) {
        return uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    }

    getValue() {
        return this.value;
    }
}