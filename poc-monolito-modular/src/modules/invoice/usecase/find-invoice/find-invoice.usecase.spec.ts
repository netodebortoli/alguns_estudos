import { v4 as uuuidv4 } from 'uuid';
import Invoice from "../../domain/invoice";
import FindInvoiceUseCase from "./find-invoice.usecase";

describe('Find invoice unit tests', () => {
    it('should find an invoice by id', async () => {
        const id = uuuidv4();
        const invoice = new Invoice({
            id: id,
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
            find: jest.fn().mockResolvedValue(Promise.resolve(invoice))
        }
        const useCase = new FindInvoiceUseCase(repository);

        // given
        const input = { id: id };

        // when
        const output = await useCase.execute(input);

        // then
        expect(output).toBeDefined();
        expect(output.id).toBe(id);
        expect(output.name).toBe(invoice.name);
        expect(output.document).toBe(invoice.document);
        expect(output.address.street).toBe(invoice.address.street);
        expect(output.address.city).toBe(invoice.address.city);
        expect(output.address.state).toBe(invoice.address.state);
        expect(output.createdAt).toBeDefined();
        expect(output.items).toBeDefined();
        expect(output.items).toHaveLength(2);
        expect(output.items.map((item, index) => {
            expect(item.id).toBe(invoice.items[index].id.value);
            expect(item.name).toBe(invoice.items[index].name.toUpperCase());
            expect(item.price).toBe(invoice.items[index].price);
        }))
        expect(output.total).toBe(200);
        expect(repository.find).toHaveBeenCalled();
    });

    it('should throw an error when invoice not found', async () => {
        const repository = {
            add: jest.fn(),
            find: jest.fn().mockResolvedValue(Promise.resolve(null))
        }
        const useCase = new FindInvoiceUseCase(repository);

        // given
        const input = { id: uuuidv4() };

        // when & then
        expect(useCase.execute(input)).rejects.toThrow(`Invoice with id ${input.id} not found`);
        expect(repository.find).toHaveBeenCalled();
    });
});
