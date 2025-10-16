import Product from "../../../domain/product";
import ProductGateway from "../../../gateway/product.gateway";

export default class ProductMemoryRepository implements ProductGateway {

    private _products: Product[] = [];

    add(product: Product): Promise<void> {
        this._products.push(product);
        return Promise.resolve();
    }

    find(id: string): Promise<Product> {
        const product = this._products.find(p => p.id.value === id);
        if (product === undefined || product === null) {
            throw new Error(`Product not found by id ${id}`);
        }
        return Promise.resolve(product);
    }

}