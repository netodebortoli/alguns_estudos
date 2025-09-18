import DomainError from "../../domain/@shared/errors/domain.error";
import NotFoundError from "../../domain/@shared/errors/not.found";
import ProductInterface from "../../domain/product-module/entity/product.interface";
import ProductRepository from "../../domain/product-module/repository/product.repository";
import ProductService from "../../domain/product-module/service/product.service";

export default class BatchProductPriceUpdate {

    constructor(private productRepository: ProductRepository) {
    }

    public async execute(input: Input): Promise<void> {
        try {
            let products: ProductInterface[] = []
            for (const index of input.ids) {
                const product = await this.productRepository.findById(index);
                products.push(product)
            }
            ProductService.updatePricesInBatch(products, input.percentage)
            for (const product of products) {
                await this.productRepository.update(product);
            }
        } catch (error) {
            if (error instanceof DomainError) {
                throw new DomainError(`An error occurred while update price of products: ${error.message}`)
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new Error(`An unexpected error occurred: ${error}`)
        }
    }
}

type Input = {
    ids: string[];
    percentage: number
}