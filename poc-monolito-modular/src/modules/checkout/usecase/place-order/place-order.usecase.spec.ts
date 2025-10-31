import ClientAdmFacade from "../../../client-adm/facade/client-adm.facade";
import PlaceOrderUseCase from "./place-order.usecase";

describe('Place order usecase unit tests', () => {

    describe('client facade execution', () => {
        it('should throw an error when client not found', async () => {
            const clientId = '1';

            const clientFacadeMock: ClientAdmFacade = {
                findClient: jest.fn().mockImplementation(() => {
                    throw new Error(`Client with id ${clientId} not found`);
                }),
                addClient: jest.fn()
            };

            //@ts-ignore
            const placeOrderUseCase = new PlaceOrderUseCase({
                clientFacade: clientFacadeMock
            });

            // given
            const input = {
                clientId: clientId,
                products: [] as { id: string }[]
            };

            // when & then
            await expect(placeOrderUseCase.execute(input))
                .rejects.toThrowError(`Client with id ${clientId} not found`);
        });
    });

    describe('product validation execution', () => {
        it('should throw an error when products are not selected', async () => {
            //@ts-ignore
            const placeOrderUseCase = new PlaceOrderUseCase({});

            const validateProductsSpy = jest.spyOn(placeOrderUseCase as any, 'validateProducts');

            // given
            const productsIds: { id: string }[] = [];

            // when & then
            await expect(placeOrderUseCase['validateProducts'](productsIds))
                .rejects.toThrow(`At least one product must be selected`);
            expect(validateProductsSpy).toHaveBeenCalledTimes(1);
        });

        it('should validate stock product when products are selected', async () => {
            const mockProductFacade = {
                addProduct: jest.fn(),
                checkStock: jest.fn(({ productId }) => {
                    return Promise.resolve({
                        productId,
                        stock: productId === "1" ? 1 : 0
                    });
                })
            };

            //@ts-ignore
            const useCase = new PlaceOrderUseCase({
                productFacade: mockProductFacade,
            });

            // given
            let input = { products: [{ id: "0" }] };

            // when & then
            await expect(useCase['validateProducts'](input.products))
                .rejects.toThrow(`Product with id 0 is out of stock`);
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(1);

            // given
            input = { products: [{ id: "1" }] };

            // when & then
            await expect(useCase['validateProducts'](input.products))
                .resolves.not.toThrow();
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(2);

            // given
            input = { products: [{ id: "1" }, { id: "2" }] };

            // when & then
            await expect(useCase['validateProducts'](input.products))
                .rejects.toThrowError(`Product with id 2 is out of stock`);
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(4);
        });
    });

});