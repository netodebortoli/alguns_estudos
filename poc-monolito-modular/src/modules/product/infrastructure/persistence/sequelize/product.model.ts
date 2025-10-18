import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import Product from "../../../domain/product";

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

    public static toDomain(productModel: ProductModel): Product {
        const product = new Product({
            id: productModel.get().id,
            name: productModel.get().name,
            description: productModel.get().description,
            purchasePrice: productModel.get().purchasePrice,
            stock: productModel.get().stock,
        });
        product.createdAt = productModel.get().createdAt;
        product.updatedAt = productModel.get().updatedAt;
        return product;
    }
}