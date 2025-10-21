import FindProductUseCase from "./find-product.usecase";

describe('FindProductUseCase unit tests', () => {
    it('should find product by id', async () => {
        const repository = {
            find: jest.fn().mockReturnValue({
                id: { value: '1' },
                name: 'Product 1',
                description: 'Description 1',
                salesPrice: 100
            }),
            findAll: jest.fn()
        };

        const useCase = new FindProductUseCase(repository);

        // given
        const input = { productId: '1' };

        // when
        const output = await useCase.execute(input);

        // then
        expect(repository.find).toHaveBeenCalled();
        expect(output).toStrictEqual({
            id: '1',
            name: 'Product 1',
            description: 'Description 1',
            salesPrice: 100
        });
    });

    it('should throw error when find a non-existing product', async () => {
        const repository = {
            find: jest.fn().mockImplementation(() => {
                throw new Error('Product not found');
            }),
            findAll: jest.fn()
        };

        const useCase = new FindProductUseCase(repository);

        // given
        const input = { productId: '999' };

        // then
        expect(() => useCase.execute(input)).rejects.toThrow('Product not found');
        expect(repository.find).toHaveBeenCalled();
    });

});