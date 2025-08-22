import Product from "../../../src/domain/product-module/entity/product"

describe('Product entity unit tests', () => {
    it('should create product', () => {
        const product = new Product("Produto", 10);
        expect(product).toBeDefined();
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Produto");
        expect(product.price).toBe(10);
    });

    it('should change product name', () => {
        const product = new Product("Produto", 10);
        product.changeName("Product");
        expect(product.name).toBe("Product");
    });

    it('should throw error when name is empty', () => {
        const product = new Product("Produto", 10);
        expect(() => product.changeName("")).toThrow("Invalid name");
    });

    it('should change product price', () => {
        const product = new Product("Product", 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    });

    it('should throw error when price is invalid', () => {
        const product = new Product("Product", 10);
        expect(() => product.changePrice(-1)).toThrow("Price value must be greater or equal zero");
    });
})