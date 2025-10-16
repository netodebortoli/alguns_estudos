import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false
})
export default class ProductModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    description: string;

    @Column({ field: "purchase_price", allowNull: false })
    purchasePrice: number;

    @Column({ allowNull: false })
    stock: number;

    @Column({ field: "created_at", allowNull: false })
    createdAt: Date;

    @Column({ field: "updated_at", allowNull: false })
    updatedAt: Date;
}