import { Column, PrimaryKey, Table, Model, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import OrdemItemModel from "./ordem-item.model";
import CustomerModel from "./customer.model";

@Table({
    tableName: "orders",
    timestamps: false // Nao gera as colunas de auditoria (createdDt, updatedAt)
})
export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @HasMany(() => OrdemItemModel) // 1 Order para N Itens ...
    declare itens: OrdemItemModel[];

    @ForeignKey(() => CustomerModel) // Faz o relacionamento apenas do campo ID
    @Column({ allowNull: false, field: "customer_id" })
    declare customerId: String;

    // Para recuperar todos os dados de um objeto, precisa fazer o mapeamento completo
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @Column({ allowNull: false })
    declare total: number;
}