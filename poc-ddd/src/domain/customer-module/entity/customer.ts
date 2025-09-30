import Entity from "../../@shared/entity/abstract-entity";
import Name from "../../@shared/vo/name";
import UUID from "../../@shared/vo/uuid";
import Address from "../vo/address";

// Classe com domínio rico.
// As funções dessa classe expressam a intenção do cliente.
// As funçoes possuem validaçoes de negócio, o mantem a integridade do objeto.
export default class Customer extends Entity {
    private _name: Name;
    private _address?: Address;
    private _status: boolean = false;
    private _rewardPoints: number;

    constructor(
        name: string,
        id?: string
    ) {
        super();
        this._id = id === undefined ? UUID.create() : new UUID(id, this);
        this._name = new Name(name, this);
        this._rewardPoints = 0;
        this.validate();
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
        this._name = new Name(name, this);
        this.validate();
    }

    updateAddres(street: string, number: string, city: string, state: string, zip: string): void {
        const address = new Address(street, number, city, state, zip, this);
        this.validate()
        this._address = address;
    }

    addRewardPoints(rewardPoints: number) {
        if (rewardPoints <= 0) {
            this.notification.addError({ context: this.constructor.name, message: 'Rewards points should be greater zero' });
        }
        this.validate()
        this._rewardPoints += rewardPoints;
    }

    // A entidade pode ter um endereço opcional.
    // Mas para ativar o usuario, o endereço é obrigatório.
    activate() {
        if (!this._address) {
            this.notification.addError(
                { context: this.constructor.name, message: 'Address cannot be empty when activating' }
            );
        }
        this.validate()
        this._status = true;
    }

    deactivate() {
        this._status = false;
    }

}