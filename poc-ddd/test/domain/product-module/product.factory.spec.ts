import ProductFactory from '../../../src/domain/product-module/factory/product.factory'

describe('Product factory unit test', () => {
    it('should create product', () => {
        const product = ProductFactory.create('Product A', 10, '1');

        expect(product).toBeDefined();
        expect(product.name).toBe('Product A');
        expect(product.price).toBe(10.0);
        expect(product.constructor.name).toBe('Product')
    })  

    it('should throw error when create product with invalid type', () => {
        expect(() => ProductFactory.create('Product C', 10, '3')).toThrow('Invalid type when create product.')
    })
})