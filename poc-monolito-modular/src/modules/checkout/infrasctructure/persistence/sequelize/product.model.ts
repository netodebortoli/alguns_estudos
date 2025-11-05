import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import Product from "../../../domain/product";

@Table({
    tableName: "products",
    timestamps: false,
})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id!: string;

    @Column({ allowNull: false })
    name!: string;

    @Column({ allowNull: false })
    description!: string;

    @Column({ allowNull: false, type: 'decimal', field: 'sales_price' })
    salesPrice!: number;

    @Column({ field: "created_at", allowNull: false })
    createdAt!: Date;

    @Column({ field: "updated_at", allowNull: false })
    updatedAt!: Date;

    @ForeignKey(() => OrderModel)
    @Column({ field: "order_id", allowNull: false })
    orderId?: string;

    static toDomain(model: ProductModel): Product {
        return new Product({
            id: model.get().id,
            name: model.get().name,
            description: model.get().description,
            salesPrice: model.get().salesPrice,
            createdAt: model.get().createdAt,
            updatedAt: model.get().updatedAt,
        })
    }
}