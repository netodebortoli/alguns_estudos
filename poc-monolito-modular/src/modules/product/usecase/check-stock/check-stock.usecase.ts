import UseCase from "../../../@shared/domain/use-case/use-case";
import ProductGateway from "../../gateway/product.gateway";

export default class CheckStockUseCase implements UseCase {
    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(input: Input): Promise<Output> {
        const product = await this._productRepository.find(input.productId);
        return {
            productId: product.id.value,
            stock: product.stock
        };
    }
}

type Input = {
    productId: string;
}

type Output = {
    productId: string;
    stock: number;
}