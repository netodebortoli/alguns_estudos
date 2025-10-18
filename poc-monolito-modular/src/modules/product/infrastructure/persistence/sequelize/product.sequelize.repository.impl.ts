import Product from "../../../domain/product";
import ProductGateway from "../../../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductSequelizeRepositoryImpl implements ProductGateway {

    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    }

    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({
            where: { id },
        });

        if (!product || product === null) {
            throw new Error(`Product with id ${id} not found`);
        }

        return ProductModel.toDomain(product);
    }

}
