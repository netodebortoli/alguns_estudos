export interface AddressProps {
    street: string;
    city: string;
    state: string;
}

export default class Address {
    private _street: string;
    private _city: string;
    private _state: string;

    constructor(addressProps: AddressProps) {
        this._street = addressProps.street;
        this._city = addressProps.city;
        this._state = addressProps.state;
        this.validate()
    }

    private validate() {
        let messages: string[] = [];
        if (!this._street || this._street.length === 0) {
            messages.push("street is required");
        }
        if (!this._state || this._state.length === 0) {
            messages.push("state is required");
        }
        if (!this._city || this._city.length === 0) {
            messages.push("city is required");
        }
        if (messages.length > 0) {
            throw new Error(messages.join(", "));
        }
    }

    get street(): string {
        return this._street;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

}