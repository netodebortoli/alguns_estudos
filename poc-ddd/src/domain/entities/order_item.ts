import OrderItemModel from "../../infrastructure/db/sequelize/model/order-item.model";
import Name from "../vos/name";
import Price from "../vos/price";
import UUID from "../vos/uuid";

export default class OrderItem {
    private _id: UUID;
    private _name: Name;
    private _price: Price;
    private _productId: UUID;
    private _quantity: number;

    constructor(itemName: string, price: number, productId: string, quantity: number, id?: string) {
        this._id = !id ? UUID.create() : new UUID(id);
        this._name = new Name(itemName);
        this._price = new Price(price);
        this._productId = new UUID(productId);
        this._quantity = quantity;
        this.validate();
    }

    get id(): string {
        return this._id.getValue();
    }

    get name(): string {
        return this._name.getValue();
    }

    get price(): number {
        return this._price.getValue();
    }

    get quantity(): number {
        return this._quantity;
    }

    get totalPrice(): number {
        return this._price.getValue() * this._quantity;
    }

    get productId(): string {
        return this._productId.getValue();
    }

    private validate() {
        if (this._quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
    }
}