import Name from "../../@shared/vo/name";
import UUID from "../../@shared/vo/uuid";
import Price from "../../checkout-module/vo/price";
import ProductInterface from "./product.interface";

export default class OtherProduct implements ProductInterface {
    private _id: UUID;
    private _name: Name;
    private _price: Price;

    constructor(name: string, price: number, id?: string) {
        this._id = !id ? UUID.create() : new UUID(id);
        this._name = new Name(name);
        this._price = new Price(price * 2);
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