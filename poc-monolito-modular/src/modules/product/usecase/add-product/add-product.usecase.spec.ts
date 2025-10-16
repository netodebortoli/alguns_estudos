import AddProductUseCase from "./add-product.usecase";

// Mock repository, para nao precisar de uma implementacao real
const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    };
}

describe("Add product usecase unit test", () => {

    it("should add a product", async () => {
        const productRepository = MockRepository();
        const usecase = new AddProductUseCase(productRepository);

        const input = {
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 100
        };

        const result = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    });

});