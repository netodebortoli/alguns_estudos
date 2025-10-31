import BaseEntity from "../../@shared/domain/entity/base.entity";
import Client from "./client";
import Product from "./product";

type OrderProps = {
    id?: string;
    client: Client;
    products: Product[];
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export default class Order extends BaseEntity {
    private _client: Client;
    private _products: Product[];
    private _status: string;

    constructor(props: OrderProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._client = props.client;
        this._products = props.products;
        this._status = props.status || "pending";
    }

    approve() {
        this._status = "approved";
    }

    decline() {
        this._status = "declined";
    }

    get totalSalesPrice() {
        return this._products.reduce((total, product) => total + product.salesPrice, 0);
    }

    get client() {
        return this._client;
    }

    get products() {
        return this._products;
    }

    get status() {
        return this._status;
    }
}