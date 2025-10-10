import Id from "../value-object/id";

export default class BaseEntity {
    private readonly _id: Id;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    constructor(id?: string) {
        this._id = new Id(id);
        this._createdAt = new Date();
        this._updatedAt = new Date();
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

    set updatedAt(date: Date) {
        this._updatedAt = date;
    }
}