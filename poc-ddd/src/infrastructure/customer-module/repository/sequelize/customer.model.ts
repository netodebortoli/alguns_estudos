import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import Customer from "../../../../domain/customer-module/entity/customer";

@Table({
    tableName: "customers",
    timestamps: false // Nao gera as colunas de auditoria (createdDt, updatedAt)
})
export default class CustomerModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column
    declare street: string;

    @Column
    declare number: string;

    @Column
    declare city: string;

    @Column
    declare zip: string;

    @Column
    declare state: string;

    @Column({ allowNull: false })
    declare status: boolean;

    @Column({ allowNull: false })
    declare rewardPoints: number;

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    static toDomain(from: CustomerModel): Customer {
        const customer = new Customer(from.name, from.id);
        customer.updateAddres(from.street, from.number, from.city, from.state, from.zip)
        if (from.status) customer.activate()
        if (from.rewardPoints > 0) customer.addRewardPoints(from.rewardPoints)
        return customer;
    }

}