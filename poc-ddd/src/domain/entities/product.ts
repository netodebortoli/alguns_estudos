import Name from "../vos/name";
import Price from "../vos/price";
import UUID from "../vos/uuid";

export default class Product {
    private _id: UUID;
    private _name: Name;
    private _price: Price;

    constructor(name: string, price: number, id?: string) {
        this._id = !id ? UUID.create() : new UUID(id);
        this._name = new Name(name);
        this._price = new Price(price);
    }

    get id() {
        return this._id.getValue();
    }

    get name() {
        return this._name.getValue();
    }

    get price() {
        return this._price.getValue();
    }

    changeName(name: string): void {
        this._name = new Name(name);
    }

    changePrice(price: number): void {
        this._price = new Price(price);
    }
}