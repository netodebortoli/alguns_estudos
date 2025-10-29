import Invoice from "../../domain/invoice";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";
import { v4 as uuuidv4 } from 'uuid';

describe('Generate invoice unit tests', () => {

    it('should generate a invoice', async () => {
        const repository = {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(null))
        }
        const useCase = new GenerateInvoiceUseCase(repository);

        // given
        const input = {
            name: 'invoice',
            document: '11223344',
            street: 'street',
            city: 'city',
            state: 'state',
            items: [
                {
                    name: 'item',
                    price: 100
                },
                {
                    name: 'item',
                    price: 100
                },
                {
                    name: 'item',
                    price: 100
                }
            ]
        }

        // when
        const output = await useCase.execute(input);

        // then
        expect(repository.add).toHaveBeenCalled();
        expect(output).toBeDefined();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.address.street).toBe(input.street);
        expect(output.address.city).toBe(input.city);
        expect(output.address.state).toBe(input.state);
        expect(output.items).toBeDefined();
        expect(output.items).toHaveLength(3);
        expect(output.items.map(i => {
            expect(i.id).toBeDefined();
            expect(i.name).toBe('ITEM');
            expect(i.price).toBe(100);
        }))
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
        expect(output.total).toBe(300);
    });

    it('should throw error when generating invoice with invalid items', async () => {
        const repository = {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(null))
        }
        const useCase = new GenerateInvoiceUseCase(repository);

        // given
        const input = {
            name: 'invoice',
            document: '11223344',
            street: 'street',
            city: 'city',
            state: 'state',
            items: [
                {
                    name: 'item',
                    price: -1
                }
            ]
        }

        // when & then
        await expect(useCase.execute(input)).rejects.toThrowError('Invoice item price must be greater or equal zero');
        expect(repository.add).not.toHaveBeenCalled();
        expect(repository.find).toHaveBeenCalled();
    });

    it('should throw error when generating invoice with invalid address', async () => {
        const repository = {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(null))
        }
        const useCase = new GenerateInvoiceUseCase(repository);

        // given
        const input = {
            name: 'invoice',
            document: '11223344',
            street: '',
            city: '',
            state: '',
            items: [
                {
                    name: 'item',
                    price: 99
                }
            ]
        }

        // when & then
        await expect(useCase.execute(input)).rejects.toThrowError('street is required, state is required, city is required');
        expect(repository.add).not.toHaveBeenCalled();
        expect(repository.find).toHaveBeenCalled();
    });

    it('should throw error when generating invoice with document already exists', async () => {
        const invoice = new Invoice({
            id: uuuidv4(),
            name: 'invoice',
            document: '11223344',
            address: {
                street: 'street',
                city: 'city',
                state: 'state'
            },
            items: [
                { id: uuuidv4(), name: 'item', price: 100 },
                { id: uuuidv4(), name: 'item', price: 100 }
            ]
        })
        const repository = {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(invoice))
        }

        const useCase = new GenerateInvoiceUseCase(repository);

        // given
        const input = {
            name: 'invoice',
            document: '11223344',
            street: 'street',
            city: 'city',
            state: 'state',
            items: [
                {
                    name: 'item',
                    price: 100
                },
                {
                    name: 'item',
                    price: 100
                },
                {
                    name: 'item',
                    price: 100
                }
            ]
        }

        // when & then
        expect(useCase.execute(input)).rejects.toThrowError(`Invoice with this document ${input.document} already exists.`);
        expect(repository.find).toHaveBeenCalled();
        expect(repository.add).not.toHaveBeenCalled();
    });

});