import ValueObject from "./value-object";
import { v4 as uuidv4 } from 'uuid';

export default class Id implements ValueObject {

    private readonly _value: string;

    constructor(value?: string) {
        if (!value || value.length === 0) {
            this._value = uuidv4();
        } else {
            if (!this.validateUUID(value)) {
                throw new Error('Invalid UUID format');
            }
            this._value = value;
        }
    }

    private validateUUID(uuid: string) {
        return uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    }

    get value(): string {
        return this._value;
    }
}