import { Column, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false // Nao gera as colunas de auditoria (createdDt, updatedAt)
})
export default class ProductModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;
}