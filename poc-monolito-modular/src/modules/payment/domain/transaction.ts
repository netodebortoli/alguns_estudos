import AggregateRoot from "../../@shared/domain/entity/aggregate-root";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id";

type TransactionProps = {
    id?: string;
    amount: number;
    orderId: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Transaction extends BaseEntity implements AggregateRoot {
    private _amount: number;
    private _orderId: Id;
    private _status: string;

    constructor(props: TransactionProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._amount = props.amount;
        this._orderId = new Id(props.orderId);
        this._status = props.status || "pending";
    }

    private approve() {
        this._status = "approved";
    }

    private decline() {
        this._status = "declined";
    }

    // Simula uma lógica de processamento de transação
    processTransaction() {
        if (this._amount >= 100) {
            this.approve();
        } else {
            this.decline();
        }
    }

    get amount(): number {
        return this._amount;
    }

    get orderId(): Id {
        return this._orderId;
    }

    get status(): string {
        return this._status;
    }

}