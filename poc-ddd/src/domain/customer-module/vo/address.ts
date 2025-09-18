import DomainError from "../../@shared/errors/domain.error";

export default class Address {
    private _street: string;
    private _number: string;
    private _city: string;
    private _state: string;
    private _zip: string;

    constructor(street: string, number: string, city: string, state: string, zip: string) {
        this._street = street;
        this._number = number;
        this._city = city;
        this._state = state;
        this._zip = zip;
        this.validate();
    }

    static of(street: string, number: string, city: string, state: string, zip: string) : Address | undefined {
        try {
            return new Address(street, number, city, state, zip);
        } catch (error) {
            return;
        }
    }

    private validate() {
        if (!this._street || this._street.length === 0) {
            throw new DomainError('Field street must be provided');
        }
        if (!this._number || this._number.length === 0) {
            throw new DomainError('Field number must be provided');
        }
        if (!this._city || this._city.length === 0) {
            throw new DomainError('Field city must be provided');
        }
        if (!this._state || this._state.length === 0) {
            throw new DomainError('Field state must be provided');
        }
        if (!this._zip || this._zip.length === 0) {
            throw new DomainError('Field zip must be provided');
        }
        if (!this.validateFormatterZip(this._zip)) {
            throw new DomainError('Invalid zip format, expected 8 numbers digits');
        }
    }

    private validateFormatterZip(zip: string): boolean {
        return zip.length === 8 && /^\d+$/.test(zip);
    }

    get street() {
        return this._street;
    }

    get number() {
        return this._number;
    }

    get city() {
        return this._city;
    }

    get state() {
        return this._state;
    }

    get zip() {
        return this._zip;
    }

    get formattedZip() {
        return this._zip.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
}
