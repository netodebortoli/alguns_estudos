// Exemplo de entidade anemica.
// Ela nao carrega regras de negocios, apenas armazena dados.
export default class Customer {
    private _id: string;
    private _name: string;
    private _email: string;
    private _phone: string;

    constructor(
        id: string,
        name: string,
        email: string,
        phone: string
    ) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get phone(): string {
        return this._phone;
    }

    set name(name: string) {
        this._name = name;
    }

    set email(email: string) {
        this._email = email;
    }

    set phone(phone: string) {
        this._phone = phone;
    }
}