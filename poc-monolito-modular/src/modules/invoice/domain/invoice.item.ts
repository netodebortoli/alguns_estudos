import AggregateRoot from "../../@shared/domain/entity/aggregate-root";
import BaseEntity from "../../@shared/domain/entity/base.entity";

export interface InvoiceItemProps {
    id?: string;
    name: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export default class InvoiceItem extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _price: number;

    constructor(props: InvoiceItemProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._price = props.price;
        this.validate()
    }

    private validate() {
        if (this._price < 0) {
            throw new Error('Invoice item price must be greater or equal zero')
        }
    }

    static create(props: InvoiceItemProps[]): InvoiceItem[] {
        return props.map(prop => new InvoiceItem(prop));
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}