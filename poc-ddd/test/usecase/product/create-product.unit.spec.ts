import ProductRepositoryMemoryImpl from '../../../src/infrastructure/product-module/repository/memory/product.memory-repository.impl';
import CreateProduct from '../../../src/usecase/product/create-product';

describe('Create product use case unit test', () => {
    const repository = new ProductRepositoryMemoryImpl();
    const useCase = new CreateProduct(repository);
    
    it('should create a product', async () => {
        // given
        const input = {
            name: 'Monitor',
            price: 100
        }; 

        // when
        const result = await useCase.execute(input);

        // then
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe('Monitor');
        expect(result.price).toBe(100);
    });

    it('should throw error when create product with invalid data', async () => {
        const invalidInputName = {
            name: '',
            price: 100
        };
        await expect(() => useCase.execute(invalidInputName)).rejects.toThrow('Invalid name')
        
        const invalidInputPrice = {
            name: 'Teclado',
            price: -1
        };
        await expect(() => useCase.execute(invalidInputPrice)).rejects.toThrow('Price value must be greater or equal zero')
    });

});