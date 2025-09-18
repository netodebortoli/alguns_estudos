import UUID from "../../../src/domain/@shared/vo/uuid";
import ProductRepository from "../../../src/domain/product-module/repository/product.repository";
import ProductRepositoryMemoryImpl from "../../../src/infrastructure/product-module/repository/memory/product.memory-repository.impl";
import CreateProduct from "../../../src/usecase/product/create-product";
import FindProduct from "../../../src/usecase/product/find-product";
import BatchProductPriceUpdate from "../../../src/usecase/product/update-product-price-batch";

describe('Update price products in batch use case test', () => {

    let productRepository: ProductRepository;
    let useCase: BatchProductPriceUpdate;
    let createProduct: CreateProduct
    let findProduct: FindProduct;

    beforeEach(() => {
        productRepository = new ProductRepositoryMemoryImpl()
        createProduct = new CreateProduct(productRepository)
        findProduct = new FindProduct(productRepository)
        useCase = new BatchProductPriceUpdate(productRepository)
    });

    it('should update product prices in batch', async () => {
        const product1 = await createProduct.execute({
            name: 'Teclado',
            price: 150
        });

        const product2 = await createProduct.execute({
            name: 'Monitor',
            price: 1000
        });

        const input = {
            percentage: 10,
            ids: [product1.id, product2.id]
        }

        // when
        await useCase.execute(input);

        // then
        expect((await findProduct.execute(product1)).price).toBe(165)
        expect((await findProduct.execute(product2)).price).toBe(1100)
    });

    it('should throw error when update product prices in batch with invalid product', async () => {
        const input = {
            percentage: 10,
            ids: [UUID.create().getValue(), UUID.create().getValue()]
        }

        // when
        await expect(useCase.execute(input)).rejects
            .toThrow('Product not found')
    });

    it('should throw error when update product prices in batch with empty product ids', async () => {
        const input = {
            percentage: 10,
            ids: []
        }

        // when
        await expect(useCase.execute(input)).rejects
            .toThrow('An error occurred while update price of products: Products should be required to update prices')
    });

});