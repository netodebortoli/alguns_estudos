// Classe com domínio rico.
// As funções dessa classe expressam a intenção do cliente.
// As funçoes possuem validaçoes de negócio, o mantem a integridade do objeto.
export default class Client {
    private _id: string;
    private _name: string;
    private _status: boolean;

    constructor(
        id: string,
        name: string,
    ) {
        this._id = id;
        this._name = name;
        this._status = true;
        this.validate();
    }

    changeName(name: string): void {
        if (name.length === 0) {
            throw new Error('Name cannot be empty');
        }
        this._name = name;
    }

    activate() {
        this._status = true;
    }

    deactivate() {
        this._status = false;
    }

    // A entidade precisa ser capaz de se auto-validar.
    private validate() {
        if (this._name.length === 0) {
            throw new Error('Name cannot be empty');
        }
        if (this._id.length === 0) {
            throw new Error('ID cannot be empty');
        }
    }
}