import FindAllProductsUseCase from "./find-all-products.usecase";

describe('FindAllProductsUseCase unit tests', () => {

    it('should find all products when exists', async () => {
        const repository = {
            find: jest.fn(),
            findAll: jest.fn().mockResolvedValue([
                {
                    id: { value: '1' },
                    name: 'Product 1',
                    description: 'Description 1',
                    salesPrice: 100
                },
                {
                    id: { value: '2' },
                    name: 'Product 2',
                    description: 'Description 2',
                    salesPrice: 200
                }
            ])
        };

        const useCase = new FindAllProductsUseCase(repository);

        // when
        const output = await useCase.execute();

        // then
        expect(repository.findAll).toHaveBeenCalled();
        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe('1');
        expect(output.products[0].name).toBe('Product 1');
        expect(output.products[0].description).toBe('Description 1');
        expect(output.products[0].salesPrice).toBe(100);
        expect(output.products[1].id).toBe('2');
        expect(output.products[1].name).toBe('Product 2');
        expect(output.products[1].description).toBe('Description 2');
        expect(output.products[1].salesPrice).toBe(200);
    });

    it('should find empty result when products not exists', async () => {
        const repository = {
            find: jest.fn(),
            findAll: jest.fn().mockResolvedValue([])
        };

        const useCase = new FindAllProductsUseCase(repository);

        // when
        const output = await useCase.execute();

        // then
        expect(repository.findAll).toHaveBeenCalled();
        expect(output.products.length).toBe(0);
    });

});