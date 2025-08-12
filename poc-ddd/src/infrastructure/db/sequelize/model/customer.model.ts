import { Column, PrimaryKey, Table, Model } from "sequelize-typescript";

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

}