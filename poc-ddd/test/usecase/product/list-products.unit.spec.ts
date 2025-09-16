import ProductRepository from '../../../src/domain/product-module/repository/product.repository';
import ProductRepositoryMemoryImpl from '../../../src/infrastructure/product-module/repository/memory/product.memory-repository.impl';
import CreateProduct from '../../../src/usecase/product/create-product';
import ListProducts from '../../../src/usecase/product/list-products';

describe('List all products use case unit test', () => {

    it('should list products', async () => {
        const repository = new ProductRepositoryMemoryImpl();
        const createProductUseCase = new CreateProduct(repository);
        const useCase = new ListProducts(repository);

        // given
        const product1 = await createProductUseCase.execute({
            name: 'Televisao',
            price: 2299
        });
        const product2 = await createProductUseCase.execute({
            name: 'Geladeira',
            price: 34900
        });

        // given
        const result = await useCase.execute();

        // then
        expect(result).toBeDefined();
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(product1)
        expect(result[1]).toEqual(product2)
    });

});