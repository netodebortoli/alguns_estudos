import UseCase from "../../../@shared/domain/use-case/use-case";
import Product from "../../domain/product";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductsUseCase implements UseCase {

    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(): Promise<Output> {
        const products = await this._productRepository.findAll();
        return this.toOutput(products);
    }

    private toOutput(products: Product[]): Output {
        return {
            products: products.map((product) => ({
                id: product.id.value,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            }))
        };
    }
}

type Output = {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[]
};


