import AggregateRoot from "../../@shared/domain/entity/aggregate-root";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "./value-object/address";

type ClientProps = {
    id?: string;
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _email: string;
    private _address: Address;

    constructor(props: ClientProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._email = props.email;
        this._address = new Address({
            street: props.street,
            city: props.city,
            state: props.state
        });
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get address() {
        return this._address;
    }

}