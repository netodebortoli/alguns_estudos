import ProductInterface from "../../domain/product-module/entity/product.interface";
import ProductRepository from "../../domain/product-module/repository/product.repository";

export default class ListProducts {

    constructor(private productRepository: ProductRepository) {
    }

    public async execute(): Promise<Output[]> {
        const products = await this.productRepository.findAll();
        return products.map(p => this.toOutput(p));
    }

    private toOutput(p: ProductInterface): Output {
        return {
            id: p.id,
            name: p.name,
            price: p.price
        };
    }
}

type Output = {
    id: string,
    name: string,
    price: number
}