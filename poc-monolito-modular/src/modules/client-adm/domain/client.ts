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
    createdDt?: Date;
    updatedDt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _email: string;
    private _address: Address;

    constructor(props: ClientProps) {
        super(props?.id, props?.createdDt, props?.updatedDt);
        this._name = props.name;
        this._email = props.email;
        this._address = new Address({
            street: props.street,
            state: props.state,
            city: props.city,
        });
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get address() {
        return this._address;
    }
}