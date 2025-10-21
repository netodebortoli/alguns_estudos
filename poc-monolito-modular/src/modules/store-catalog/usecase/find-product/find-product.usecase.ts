import UseCase from "../../../@shared/domain/use-case/use-case";
import ProductGateway from "../../gateway/product.gateway";

export default class FindProductUseCase implements UseCase {

    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(input: Input): Promise<Output> {
        const product = await this._productRepository.find(input.productId);
        return {
            id: product.id.value,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        };
    }
}

type Input = {
    productId: string;
};

type Output = {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
};
