import Entity from "../../@shared/entity/abstract-entity";
import Name from "../../@shared/vo/name";
import UUID from "../../@shared/vo/uuid";
import Price from "../vo/price";

export default class OrderItem extends Entity {
    private _name: Name;
    private _price: Price;
    private _productId: UUID;
    private _quantity: number;

    constructor(itemName: string, price: number, productId: string, quantity: number, id?: string) {
        super();
        this._id = id === undefined ? UUID.create() : new UUID(id, this);
        this._name = new Name(itemName, this);
        this._price = new Price(price, this);
        this._productId = new UUID(productId, this);
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

    override validate() {
        if (this._quantity <= 0) {
            this.notification.addError({
                context: this.constructor.name,
                message: 'Quantity must be greater than zero'
            })
        }
        super.validate();
    }
}