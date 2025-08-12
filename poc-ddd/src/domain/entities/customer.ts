import CustomerModel from "../../infrastructure/db/sequelize/model/customer.model";
import Address from "../vos/address";
import Name from "../vos/name";
import UUID from "../vos/uuid";

// Classe com domínio rico.
// As funções dessa classe expressam a intenção do cliente.
// As funçoes possuem validaçoes de negócio, o mantem a integridade do objeto.
export default class Customer {
    private _id: UUID;
    private _name: Name;
    private _address?: Address;
    private _status: boolean = false;
    private _rewardPoints: number;

    constructor(
        name: string,
        address?: Address
    ) {
        this._id = UUID.create();
        this._name = new Name(name);
        this._rewardPoints = 0;
        if (address) this._address = address;
    }

    static fromModel(model: CustomerModel): Customer {
        const address = Address.fromModel(model.street, model.number, model.city, model.state, model.zip);
        const customer = new Customer(model.name, address);
        customer._id = new UUID(model.id);
        customer._status = model.status;
        customer._rewardPoints = model.rewardPoints;
        return customer;
    }

    get id() {
        return this._id.getValue();
    }

    get name() {
        return this._name.getValue();
    }

    get isActive() {
        return this._status;
    }

    get address() {
        return this._address;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

    changeName(name: string): void {
        this._name = new Name(name);
    }

    updateAddres(street: string, number: string, city: string, state: string, zip: string): void {
        const address = new Address(street, number, city, state, zip);
        this._address = address;
    }

    addRewardPoints(rewardPoints: number) {
        if (rewardPoints <= 0) throw new Error("Rewards points should be greater zero");
        this._rewardPoints += rewardPoints; 
    }

    // A entidade pode ter um endereço opcional.
    // Mas para ativar o usuario, o endereço é obrigatório.
    activate() {
        if (!this._address) {
            throw new Error('Address cannot be empty when activating');
        }
        this._status = true;
    }

    deactivate() {
        this._status = false;
    }

}