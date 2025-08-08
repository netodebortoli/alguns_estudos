import ProductModel from "../../infrastructure/db/sequelize/model/product.model";
import Name from "../vos/name";
import Price from "../vos/price";
import UUID from "../vos/uuid";

export default class Product {
    private _id: UUID;
    private _name: Name;
    private _price: Price;

    constructor(name: string, price: number) {
        this._id = UUID.create();
        this._name = new Name(name);
        this._price = new Price(price);
    }

    static fromModel(model: ProductModel): Product {
        let product = new Product(model.name, model.price);
        product._id = new UUID(model.id);
        return product;
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