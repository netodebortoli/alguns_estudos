import Product from "../../domain/entities/product";
import ProductRepository from "../../domain/repositories/product.repository";
import ProductModel from "../db/sequelize/model/product.model";
import { Sequelize } from "sequelize-typescript";

export default class ProductRepositoryImpl implements ProductRepository {

    constructor(private sequelize?: Sequelize) {}

    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price
        }, {
            where: { id: entity.id }
        });
    }

    async findById(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id } });
        if (!productModel) {
            throw new Error("Product not found");
        }
        return ProductModel.toDomain(productModel);
    }

    async findAll(): Promise<Product[]> {
        const result = await ProductModel.findAll();
        return result.map(ProductModel.toDomain);
    }

}