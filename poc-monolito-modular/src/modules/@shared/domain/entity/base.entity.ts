import Id from "../value-object/id";
import AggregateRoot from "./aggregate-root";

export default class BaseEntity implements AggregateRoot {
    private readonly _id: Id;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
        this._id = new Id(id);
        this._createdAt = createdAt ?? new Date();
        this._updatedAt = updatedAt ?? new Date();
    }

    get id() {
        return this._id;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set createdAt(date: Date) {
        this._createdAt = date;
    }

    set updatedAt(date: Date) {
        this._updatedAt = date;
    }
}