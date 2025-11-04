import ClientAdmFacade from "../../../client-adm/facade/client-adm.facade";
import Product from "../../domain/product";
import PlaceOrderUseCase from "./place-order.usecase";
import { v4 as uuuidv4 } from 'uuid'

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

    describe('get product validation execution', () => {
        //@ts-ignore
        const useCase = new PlaceOrderUseCase({});
        const mockDate = jest.useFakeTimers("modern")

        beforeAll(() => {
            mockDate.setSystemTime(new Date('2023-01-01'));
        })

        afterAll(() => {
            jest.useRealTimers();
        });

        it('should throw error when product not found', async () => {
            const id = '11223344';
            const storeCatalogFacadeMock = {
                find: jest.fn().mockImplementation(() => {
                    throw new Error(`Product with ${id} not found`);

                }),
                findAll: jest.fn()
            }

            useCase['_storeCatalogFacade'] = storeCatalogFacadeMock;

            // given
            const input = [{ id }];

            // when & then
            await expect(useCase["getProducts"](input))
                .rejects.toThrowError(`Product with ${id} not found`);
            expect(storeCatalogFacadeMock.find).toHaveBeenCalledTimes(1);
        });

        it('should get product', async () => {
            const product1 = {
                id: uuuidv4(),
                name: "Product 1",
                salesPrice: 100,
                description: "Description product 1"
            }
            const product2 = {
                id: uuuidv4(),
                name: "Product 2",
                salesPrice: 25,
                description: "Description product 2"
            }
            const storeCatalogFacadeMock = {
                find: jest.fn(
                    ({ productId }) => {
                        if (productId === product1.id) {
                            return Promise.resolve(product1)
                        }
                        if (productId === product2.id) {
                            return Promise.resolve(product2)
                        }
                    }
                ),
                findAll: jest.fn()
            }

            useCase['_storeCatalogFacade'] = storeCatalogFacadeMock;

            // given
            const input = [{ id: product1.id }, { id: product2.id }];

            // when & then
            await expect(useCase['getProducts'](input)).resolves.toEqual(
                [
                    new Product({ id: product1.id, name: product1.name, salesPrice: product1.salesPrice, description: product1.description }),
                    new Product({ id: product2.id, name: product2.name, salesPrice: product2.salesPrice, description: product2.description }),
                ]
            );
            expect(storeCatalogFacadeMock.find).toHaveBeenCalledWith({ productId: product1.id });
            expect(storeCatalogFacadeMock.find).toHaveBeenCalledWith({ productId: product2.id });
            expect(storeCatalogFacadeMock.find).toHaveBeenCalledTimes(2);
        });
    });

    describe('execute method', () => {
        const mockDate = jest.useFakeTimers("modern")

        beforeAll(() => {
            mockDate.setSystemTime(new Date('2023-01-01'));
        })

        afterAll(() => {
            jest.useRealTimers();
        });

        // Mock client admin facade
        const client = {
            id: uuuidv4(),
            name: "Client name",
            email: "client@email.com",
            street: "street",
            city: "city",
            state: "state",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const clientFacadeMock: ClientAdmFacade = {
            findClient: jest.fn().mockReturnValue(Promise.resolve(client)),
            addClient: jest.fn()
        };

        // Mock store catalog facade
        const productId = uuuidv4();
        const product = {
            id: uuuidv4(),
            name: "Product 1",
            salesPrice: 199,
            description: "Description product 1"
        }
        const storeCatalogFacadeMock = {
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            findAll: jest.fn()
        }

        // Mock product admin facade
        const productStock = {
            productId: productId,
            stock: 10
        }
        const productFacadeMock = {
            addProduct: jest.fn(),
            checkStock: jest.fn().mockReturnValue(Promise.resolve(productStock))
        };

        // Mock payment facade
        const paymentFacadeMock = {
            processTransaction: jest.fn()
        }

        // Mock invoice facade
        const invoiceFacadeMock = {
            generate: jest.fn(),
            find: jest.fn()
        }

        // Mock checkout repository
        const checkoutRepository = {
            add: jest.fn(),
            find: jest.fn()
        }

        const useCase = new PlaceOrderUseCase({
            clientFacade: clientFacadeMock,
            productFacade: productFacadeMock,
            storeCatalogFacade: storeCatalogFacadeMock,
            paymentFacade: paymentFacadeMock,
            invoiceFacade: invoiceFacadeMock,
            checkoutRepository: checkoutRepository
        })

        //@ts-ignore
        const spyValidateProducts = jest.spyOn(useCase, 'validateProducts');
        //@ts-ignore
        const spyGetProducts = jest.spyOn(useCase, 'getProducts');
        //@ts-ignore
        const spyCreateClient = jest.spyOn(useCase, 'createClient');

        it('should not be approved', async () => {
            const rejectedTransaction = {
                transactionId: uuuidv4(),
                orderId: uuuidv4(),
                amount: product.salesPrice,
                status: 'declined',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            paymentFacadeMock.processTransaction = paymentFacadeMock.processTransaction
                .mockReturnValue(Promise.resolve(rejectedTransaction));

            // given
            const input = { clientId: client.id, products: [{ id: product.id }] }

            // when
            const result = await useCase.execute(input);

            // then
            expect(result.id).toBeDefined();
            expect(result.invoiceId).toBe('');
            expect(result.products[0].id).toBe(product.id);
            expect(result.total).toBe(product.salesPrice);
            expect(result.status).toBe("declined");

            expect(spyGetProducts).toHaveBeenCalledTimes(1);
            expect(spyValidateProducts).toHaveBeenCalledTimes(1);
            expect(spyCreateClient).toHaveBeenCalledTimes(1);

            expect(checkoutRepository.add).toHaveBeenCalledTimes(1);
            expect(paymentFacadeMock.processTransaction).toHaveBeenCalledTimes(1);
            expect(paymentFacadeMock.processTransaction).toHaveBeenCalledWith({
                orderId: result.id,
                amount: result.total
            });
            expect(invoiceFacadeMock.generate).toHaveBeenCalledTimes(0);
        });

        it('should place a order', async () => {
            const invoice = {
                id: uuuidv4(),
                name: 'name',
                document: 'document',
                address: {
                    street: client.street,
                    city: client.city,
                    state: client.state
                },
                items: [{
                    id: product.id,
                    name: product.name,
                    price: product.salesPrice
                }],
                createdAt: new Date(),
                updatedAt: new Date(),
                total: product.salesPrice
            }
            invoiceFacadeMock.generate = invoiceFacadeMock.generate
                .mockReturnValue(Promise.resolve(invoice))

            const transaction = {
                transactionId: uuuidv4(),
                orderId: uuuidv4(),
                amount: product.salesPrice,
                status: 'approved',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            paymentFacadeMock.processTransaction = paymentFacadeMock.processTransaction
                .mockReturnValue(Promise.resolve(transaction));

            // given
            const input = { clientId: client.id, products: [{ id: product.id }] }

            // when
            const result = await useCase.execute(input);

            // then
            expect(result.id).toBeDefined();
            expect(result.invoiceId).toBe(invoice.id);
            expect(result.status).toBe("approved");
            expect(result.total).toBe(product.salesPrice);
            expect(result.products[0].id).toBe(product.id);

            expect(spyGetProducts).toHaveBeenCalledTimes(1);
            expect(spyValidateProducts).toHaveBeenCalledTimes(1);
            expect(spyCreateClient).toHaveBeenCalledTimes(1);

            expect(checkoutRepository.add).toHaveBeenCalledTimes(1);
            expect(paymentFacadeMock.processTransaction).toHaveBeenCalledTimes(1);
            expect(paymentFacadeMock.processTransaction).toHaveBeenCalledWith({
                orderId: result.id,
                amount: result.total
            });
            expect(invoiceFacadeMock.generate).toHaveBeenCalledTimes(1);
            expect(invoiceFacadeMock.generate).toHaveBeenCalledWith({
                name: client.name,
                document: 'document',
                street: client.street,
                state: client.state,
                city: client.city,
                items: [{ name: product.name, price: product.salesPrice }]
            })
        });
    });

});

