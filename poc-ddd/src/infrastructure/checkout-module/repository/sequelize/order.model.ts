import { Column, PrimaryKey, Table, Model, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import OrderItemModel from "./order-item.model";
import CustomerModel from "../../../customer-module/repository/sequelize/customer.model";
import Order from "../../../../domain/checkout-module/entity/order";

@Table({
    tableName: "orders",
    timestamps: false // Nao gera as colunas de auditoria (createdDt, updatedAt)
})
export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @HasMany(() => OrderItemModel) // 1 Order para N Itens ...
    declare itens: OrderItemModel[];

    @ForeignKey(() => CustomerModel) // Faz o relacionamento apenas do campo ID
    @Column({ allowNull: false, field: "customer_id" })
    declare customerId: string;

    // Para recuperar todos os dados de um objeto, precisa fazer o mapeamento completo
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @Column({ allowNull: false })
    declare total: number;

    static toDomain(from: OrderModel): Order {
        return new Order(
            from.customerId,
            from.itens.map(OrderItemModel.toDomain),
            from.id
        )
    }
}