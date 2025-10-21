import Product from "../../../domain/product";
import ProductGateway from "../../../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductSequelizeRepositoryImpl implements ProductGateway {

    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({
            where: { id },
        });

        if (!product || product === null) {
            throw new Error(`Product with id ${id} not found`);
        }

        return ProductModel.toDomain(product);
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();
        return products.map(ProductModel.toDomain);
    }

}