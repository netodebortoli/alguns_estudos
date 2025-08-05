import UUID from "../vos/uuid";
import OrderItem from "./order_item";

export default class Order {
    private _id: UUID;
    private _itens: OrderItem[];
    private _customerId: UUID;
    private _createdDt: Date;

    constructor(customerId: UUID, orderItens: OrderItem[]) {
        this._id = UUID.create();
        this._createdDt = new Date();
        this._customerId = customerId;
        this._itens = orderItens;
        this.validate();
    }

    addNewItem(item: OrderItem) {
        if (!item) {
            throw new Error("Ordem item must be not null")
        }
        this._itens.push(item);
    }

    get totalOrder() {
        return this._itens.reduce((acc, item) => acc + item.price, 0);
    }

    private validate() {
        if (!this._customerId) {
            throw new Error("Customer is required");
        }
        if (!this._itens || this._itens.length === 0) {
            throw new Error("A order requires at least one item");
        }
    }
}