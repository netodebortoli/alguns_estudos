import ProductFactory from "../../domain/product-module/factory/product.factory";
import ProductRepository from "../../domain/product-module/repository/product.repository";

export default class CreateProduct {

    constructor(private productRepository: ProductRepository) {
    }

    public async execute(input: Input): Promise<Output> {
        const newProduct = ProductFactory.create(
            input.name,
            input.price,
            "1"
        );
        await this.productRepository.create(newProduct);
        return {
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price
        } as Output;
    }
}

type Input = {
    name: string,
    price: number,
}

type Output = {
    id: string,
    name: string,
    price: number
}