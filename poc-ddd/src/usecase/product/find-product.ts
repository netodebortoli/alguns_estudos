import ProductRepository from "../../domain/product-module/repository/product.repository";

export default class FindProduct {

    constructor(private productRepository: ProductRepository) {
    }

    public async execute(input: Input): Promise<Output> {
        const product = await this.productRepository.findById(input.id);
        return {
            id: product.id,
            name: product.name,
            price: product.price
        } as Output;
    }
}

type Input = {
    id: string,
}

type Output = {
    id: string,
    name: string,
    price: number
}