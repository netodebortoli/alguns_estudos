import ProductRepositoryMemoryImpl from '../../../src/infrastructure/product-module/repository/memory/product.memory-repository.impl';
import CreateProduct from '../../../src/usecase/product/create-product';
import FindProduct from '../../../src/usecase/product/find-product';

describe('Create product use case unit test', () => {
    const repository = new ProductRepositoryMemoryImpl();
    const createProductUseCase = new CreateProduct(repository);
    const useCase = new FindProduct(repository);
    
    it('should find a product', async () => {
        // given
        const product = await createProductUseCase.execute({
            name: 'Mouse Gamer',
            price: 250
        });

        const input = {
            id: product.id
        }; 

        // when
        const result = await useCase.execute(input);

        // then
        expect(result).toBeDefined();
        expect(result.name).toBe('Mouse Gamer');
        expect(result.price).toBe(250);
    });

    it('should throw error when not find product', async () => {
        const input = {
            id: ''
        };
        await expect(() => useCase.execute(input)).rejects.toThrow('Product not found')    
    });

});