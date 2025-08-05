import UUID from "../vos/uuid";

export default class OrderItem {
    private _id: UUID;
    private _name: string;
    private _price: number;

    constructor(itemName: string, price: number) {
        this._id = UUID.create();
        this._name = itemName;
        this._price = price;
        this.validate();
    }

    private validate() {
        if (!this._name || this._name.length === 0) {
            throw new Error("Name of order item is required")
        }
        if (!this._price || this._price <= 0) {
            throw new Error("Price of order item is required")
        }
    }

    get price(): number {
        return this._price;
    }
}