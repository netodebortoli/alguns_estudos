import Entity from "../../@shared/entity/abstract-entity";
import UUID from "../../@shared/vo/uuid";
import OrderItem from "./order_item";

export default class Order extends Entity {

    private _itens: OrderItem[];
    private _customerId: UUID;

    constructor(customerId: string, orderItens: OrderItem[], id?: string) {
        super();
        this._id = id === undefined ? UUID.create() : new UUID(id, this);
        this._customerId = new UUID(customerId, this);
        this._itens = orderItens;
        this.validate();
    }

    get id() {
        return this._id.getValue();
    }

    get customerId() {
        return this._customerId.getValue();
    }

    get totalOrder() {
        return this._itens.reduce((acc, item) => acc + item.totalPrice, 0);
    }

    get orderItens() {
        return this._itens
    }

    addNewItem(item?: OrderItem) {
        if (!item) {
            throw new Error("Ordem item must be not null")
        }
        this._itens.push(item);
    }

    protected override validate() {
        if (!this._customerId) {
            this.notification.addError({
                context: this.constructor.name,
                message: 'Customer is required'
            })
        }
        if (!this._itens || this._itens.length === 0) {
            this.notification.addError({
                context: this.constructor.name,
                message: 'A order requires at least one item'
            })
        }
        super.validate();
    }
}