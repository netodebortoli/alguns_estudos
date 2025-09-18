import ProductInterface from "../../domain/product-module/entity/product.interface";
import ProductRepository from "../../domain/product-module/repository/product.repository";

export default class ListProducts {

    constructor(private productRepository: ProductRepository) {
    }

    public async execute(): Promise<Output> {
        const products = await this.productRepository.findAll();
        return {
            products: products.map(this.toProductOutput)
        } as Output;
    }

    private toProductOutput(p: ProductInterface): ProductOutput {
        return {
            id: p.id,
            name: p.name,
            price: p.price
        };
    }
}

type Output = {
    products: ProductOutput[]
}

type ProductOutput = {
    id: string,
    name: string,
    price: number
}