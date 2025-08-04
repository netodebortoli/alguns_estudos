// Classe com domínio rico.
// As funções dessa classe expressam a intenção do cliente.
// As funçoes possuem validaçoes de negócio, o mantem a integridade do objeto.
export default class Client {
    private _id: string;
    private _name: string;
    private _address?: string;
    private _status: boolean = false;

    constructor(
        id: string,
        name: string,
        address?: string
    ) {
        this._id = id;
        this._name = name;
        if (address) {
            this._address = address;
        }
        this.validate();
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    // A entidade pode ter um endereço opcional.
    // Mas para ativar o usuario, o endereço é obrigatório.
    activate() {
        if (this._address?.length === 0) {
            throw new Error('Address cannot be empty when activating');
        }
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