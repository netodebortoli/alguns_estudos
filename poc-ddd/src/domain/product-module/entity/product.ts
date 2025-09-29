import Entity from "../../@shared/entity/abstract-entity";
import Name from "../../@shared/vo/name";
import UUID from "../../@shared/vo/uuid";
import Price from "../../checkout-module/vo/price";

export default class Product extends Entity {

    private _name: Name;
    private _price: Price;

    constructor(name: string, price: number, id?: string) {
        super();
        this._id = id === undefined ? UUID.create() : new UUID(id, this);
        this._name = new Name(name, this);
        this._price = new Price(price, this);
        this.validate();

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
        this._name = new Name(name, this);
        this.validate();
    }

    changePrice(price: number): void {
        this._price = new Price(price, this);
        this.validate();
    }

}