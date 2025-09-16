import ProductRepositoryMemoryImpl from '../../../src/infrastructure/product-module/repository/memory/product.memory-repository.impl';
import CreateProduct from '../../../src/usecase/product/create-product';
import UpdateProduct from '../../../src/usecase/product/update-product';

describe('Update product use case unit test', () => {
    const repository = new ProductRepositoryMemoryImpl();
    const createProductUseCase = new CreateProduct(repository);
    const useCase = new UpdateProduct(repository);
    
    it('should update a product name', async () => {
        // given
        const product = await createProductUseCase.execute({
            name: 'Monitor',
            price: 1000
        });

        const input = {
            id: product.id,
            name: 'Monitor Samsumg FullHd 24Pol 240hz',
        }

        // when
        const result = await useCase.execute(input);

        // then
        expect(result).toBeDefined();
        expect(result.id).toBe(product.id);
        expect(result.name).toBe('Monitor Samsumg FullHd 24Pol 240hz');
        expect(result.price).toBe(1000);
    });

    it('should update a product price', async () => {
        // given
        const product = await createProductUseCase.execute({
            name: 'Monitor',
            price: 1000
        });

        const input = {
            id: product.id,
            price: 1099.99
        }

        // when
        const result = await useCase.execute(input);

        // then
        expect(result).toBeDefined();
        expect(result.id).toBe(product.id);
        expect(result.name).toBe('Monitor');
        expect(result.price).toBe(1099.99);
    });

    it('should throw error when not found product', async () => {
        const input = {
            id: "",
            name: 'Mousepad',
            price: 100
        }

        await expect(useCase.execute(input)).rejects.toThrow('Product not found')
    });

    it('should throw error when update product with invalid name', async () => {
        // given
        const product = await createProductUseCase.execute({
            name: 'Monitor',
            price: 1000
        });

        const input = {
            id: product.id,
            name: ''
        }

        // then
        await expect(useCase.execute(input)).rejects.toThrow("Invalid name")
    });

    
    it('should throw error when update customer with invalid name', async () => {
        // given
        const product = await createProductUseCase.execute({
            name: 'Cadeira Gamer',
            price: 1000
        });

        const input = {
            id: product.id,
            price: -1000
        }

        // then
        await expect(useCase.execute(input)).rejects.toThrow("Price value must be greater or equal zero")
    });

});