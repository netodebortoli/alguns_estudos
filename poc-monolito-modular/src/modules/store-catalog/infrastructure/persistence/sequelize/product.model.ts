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

    @Column({ field: "sales_price", allowNull: false })
    salesPrice: number;

    public static toDomain(productModel: ProductModel): Product {
        return new Product({
            id: productModel.get().id,
            name: productModel.get().name,
            description: productModel.get().description,
            salesPrice: productModel.get().salesPrice
        });
    }
}