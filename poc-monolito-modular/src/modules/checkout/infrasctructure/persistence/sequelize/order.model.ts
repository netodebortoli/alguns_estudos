import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import ClientModel from "./client.model";
import ProductModel from "./product.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id?: string;

    @ForeignKey(() => ClientModel)
    @Column({ allowNull: false, field: 'client_id' })
    clientId?: string;

    @BelongsTo(() => ClientModel)
    client?: ClientModel;

    @HasMany(() => ProductModel, 'orderId')
    products?: ProductModel[];

    @Column({ allowNull: false })
    status?: string;

    @Column({ field: "created_at", allowNull: false })
    createdAt?: Date;

    @Column({ field: "updated_at", allowNull: false })
    updatedAt?: Date;
}