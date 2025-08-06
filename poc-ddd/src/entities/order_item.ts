import Name from "../vos/name";
import Price from "../vos/price";
import UUID from "../vos/uuid";

export default class OrderItem {
    private _id: UUID;
    private _name: Name;
    private _price: Price;

    constructor(itemName: string, price: number) {
        this._id = UUID.create();
        this._name = new Name(itemName);
        this._price = new Price(price);
    }

    get name(): string {
        return this._name.getValue();
    }

    get price(): number {
        return this._price.getValue();
    }
}