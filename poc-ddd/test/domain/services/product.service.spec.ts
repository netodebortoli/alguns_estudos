import Product from '../../../src/domain/product-module/entity/product';
import ProductService from "../../../src/domain/product-module/service/product.service";

describe('Product domain service unit tests', () => {

    it('should change products price in batch', () => {
        const p1 = new Product('Produto 1', 10)
        const p2 = new Product('Produto 2', 20);
        const products = [p1, p2];

        ProductService.updatePricesInBatch(products, 100);

        expect(p1.price).toBe(20);
        expect(p2.price).toBe(40);
    });

    it('should throw error when update products price in batch with invalid value', () => {
        const p1 = new Product('Produto 1', 10)
        const p2 = new Product('Produto 2', 20);
        const products = [p1, p2];

        expect(() => ProductService.updatePricesInBatch(products, 0))
            .toThrow('Percentage value should be greater than zero')
    });

    it('should throw error when update products price in batch with invalid products', () => {
        expect(() => ProductService.updatePricesInBatch([], 50))
            .toThrow('Products should be required to update price')
    });
})