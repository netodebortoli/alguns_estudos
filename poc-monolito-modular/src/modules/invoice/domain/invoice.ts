import AggregateRoot from "../../@shared/domain/entity/aggregate-root";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import InvoiceItem, { InvoiceItemProps } from "./invoice.item";
import Address, { AddressProps } from "./value-object/address";

export interface InvoiceProps {
    id?: string;
    name: string;
    document: string;
    address: AddressProps;
    items: InvoiceItemProps[];
    updatedAt?: Date;
    createdAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItem[];

    constructor(invoiceProps: InvoiceProps) {
        super(invoiceProps.id, invoiceProps.createdAt, invoiceProps.updatedAt);
        this._name = invoiceProps.name;
        this._document = invoiceProps.document;
        this._items = InvoiceItem.create(invoiceProps.items);
        this._address = new Address(invoiceProps.address);
    }

    get name() {
        return this._name;
    }

    get document() {
        return this._document;
    }

    get address() {
        return this._address;
    }

    get items() {
        return this._items;
    }

    get total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }

} 