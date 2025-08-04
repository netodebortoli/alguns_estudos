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

    private validate() {
        if (!this._street || this._street.length === 0) {
            throw new Error('Field street must be provided');
        }
        if (!this._number || this._number.length === 0) {
            throw new Error('Field number must be provided');
        }
        if (!this._city || this._city.length === 0) {
            throw new Error('Field city must be provided');
        }
        if (!this._state || this._state.length === 0) {
            throw new Error('Field state must be provided');
        }
        if (!this._zip || this._zip.length === 0) {
            throw new Error('Field zip must be provided');
        }
        if (!this.validateFormatterZip(this._zip)) {
            throw new Error('Invalid zip format, expected format is XXXXX-XXX');
        }
    }

    private validateFormatterZip(zip: string): boolean {
        return zip.match(/^\d{5}-\d{3}$/) !== null;
    }
}
