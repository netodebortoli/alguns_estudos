import { Column, PrimaryKey, Table, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import ProductModel from "./product.model";
import OrderModel from "./ordem.model";

@Table({
    tableName: "order_itens",
    timestamps: false // Nao gera as colunas de auditoria (createdDt, updatedAt)
})
export default class OrdemItemModel extends Model {

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
}