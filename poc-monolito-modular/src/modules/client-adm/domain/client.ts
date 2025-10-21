import AggregateRoot from "../../@shared/domain/entity/aggregate-root";
import BaseEntity from "../../@shared/domain/entity/base.entity";

type ClientProps = {
    id?: string;
    name: string;
    email: string;
    address: string;
    createdDt?: Date;
    updatedDt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _email: string;
    private _address: string;

    constructor(props: ClientProps) {
        super(props?.id, props?.createdDt, props?.updatedDt);
        this._name = props.name;
        this._email = props.email;
        this._address = props.address;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get address(): string {
        return this._address;
    }
}