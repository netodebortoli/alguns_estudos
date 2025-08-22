import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderItem from "../../../../domain/checkout-module/entity/order_item";
import OrderModel from "./order.model";
import ProductModel from "../../../product-module/repository/sequelize/product.model";

@Table({
    tableName: "order_itens",
    timestamps: false // Nao gera as colunas de auditoria (createdDt, updatedAt)
})
export default class OrderItemModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false, field: "order_id" })
    declare orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false, field: "product_id" })
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;

    @Column({ allowNull: false })
    declare quantity: number;

    static toModel(from: OrderItem): OrderItemModel {
        return new OrderItemModel({
            id: from.id,
            productId: from.productId,
            name: from.name,
            price: from.price,
            quantity: from.quantity
        })
    }

    static toDomain(from: OrderItemModel): OrderItem {
        return new OrderItem(
            from.name,
            from.price,
            from.productId,
            from.quantity,
            from.id
        )
    }
}