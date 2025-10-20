import CheckStockUseCase from './check-stock.usecase';

describe('Check stock use case unit tests', () => {

    it('should return the stock of a product', async () => {
        // Mock repository, para nao precisar de uma implementacao real
        const mockProduct = {
            id: { value: '112233' },
            name: 'Product',
            description: 'Product description',
            purchasePrice: 100,
            stock: 10,
        }

        const repository = {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(mockProduct))
        };

        const useCase = new CheckStockUseCase(repository);

        const input = {
            productId: '112233'
        }

        const result = await useCase.execute(input);
        
        expect(repository.find).toHaveBeenCalled();
        expect(result).toBeDefined();
        expect(result.productId).toBe(input.productId);
        expect(result.stock).toBe(10);
    });


    it('should throw an error if product is not found', async () => {
        const repository = {
            add: jest.fn(),
            find: jest.fn().mockImplementation(() => {
                throw new Error("Product not found");
            })
        };

        const useCase = new CheckStockUseCase(repository);

        const input = { productId: '112233' };

        expect(async () => useCase.execute(input)).rejects.toThrowError('Product not found');
        expect(repository.find).toHaveBeenCalled();
    });

});