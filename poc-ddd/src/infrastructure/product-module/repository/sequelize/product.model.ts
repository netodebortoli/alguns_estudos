import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import Product from "../../../../domain/product-module/entity/product";

@Table({
    tableName: "products",
    timestamps: false // Nao gera as colunas de auditoria (createdDt, updatedAt)
})
export default class ProductModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    static toDomain(from: ProductModel): Product {
        return new Product(from.name, from.price, from.id);
    }
}