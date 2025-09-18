import DomainError from "../../domain/@shared/errors/domain.error";
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
            throw new DomainError(`An error occurred while update price of products. ${error}`)
        }
    }
}

type Input = {
    ids: string[];
    percentage: number
}