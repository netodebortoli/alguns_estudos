import Product from "../../../../domain/product-module/entity/product";
import ProductRepository from "../../../../domain/product-module/repository/product.repository";

export default class ProductRepositoryMemoryImpl implements ProductRepository {

    private products: Map<String,Product>;

    constructor() {
        this.products = new Map();
    }

    async create(entity: Product): Promise<void> {
        this.products.set(entity.id, entity);
    }

    async update(entity: Product): Promise<void> {
        this.findById(entity.id);
        this.products.set(entity.id, entity);
    }

    async findById(id: string): Promise<Product> {
        const product = this.products.get(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }

    async findAll(): Promise<Product[]> {
        return Array.from(this.products.values());
    }

}