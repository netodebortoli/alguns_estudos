import ProductInterface from "../../domain/product-module/entity/product.interface";
import ProductRepository from "../../domain/product-module/repository/product.repository";

export default class UpdateProduct {

    constructor(private productRepository: ProductRepository) {
    }

    public async execute(input: Input): Promise<Output> {
        const product = await this.productRepository.findById(input.id);
        this.updateName(input, product);
        this.updatePrice(input, product);
        return {
            id: product.id,
            name: product.name,
            price: product.price
        } as Output;
    }

    private updatePrice(input: Input, product: ProductInterface) {
        if (input.price !== undefined) {
            product.changePrice(input.price);
        }
    }

    private updateName(input: Input, product: ProductInterface) {
        if (input.name !== undefined) {
            product.changeName(input.name);
        }
    }
}

type Input = {
    id: string,
    name?: string,
    price?: number,
}

type Output = {
    id: string,
    name: string,
    price: number
}