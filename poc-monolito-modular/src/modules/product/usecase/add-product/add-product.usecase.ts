import UseCase from "../../../@shared/domain/usecase/use-case";
import Product from "../../domain/product";
import ProductGateway from "../../gateway/product.gateway";

export default class AddProductUseCase implements UseCase {

    private _repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._repository = repository;
    }

    async execute(input: Input): Promise<Output> {
        const productProps = {
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        }

        const product = new Product(productProps)

        await this._repository.add(product);

        return {
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }
    }
}

type Input = {
    name: string,
    description: string,
    purchasePrice: number,
    stock: number
}

type Output = {
    id: string,
    name: string,
    description: string,
    purchasePrice: number,
    stock: number,
    createdAt: Date,
    updatedAt: Date
}