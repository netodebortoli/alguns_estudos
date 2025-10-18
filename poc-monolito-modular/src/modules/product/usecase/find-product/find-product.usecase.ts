import ProductGateway from "../../gateway/product.gateway";

export default class FindProductUseCase {

    private _repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._repository = repository;
    }

    async execute(input: Input): Promise<Output> {
        const product = await this._repository.find(input.id);
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
    id: string
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