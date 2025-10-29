import { v4 as uuuidv4 } from 'uuid';
import Invoice from "../domain/invoice";
import InvoiceFacadeFactory from "../infrastructure/factory/invoice.facade.factory";
import InvoiceMemoryRepositoryImpl from "../infrastructure/persistence/memory/invoice.memory.repository.impl";

describe('Invoice facade integration tests', () => {

    const repository = new InvoiceMemoryRepositoryImpl();
    const facade = InvoiceFacadeFactory.create(repository);

    it('should generate a invoice', async () => {
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
        const result = await facade.generate(input);

        // then
        expect(result).toBeDefined();
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.address.street).toBe(input.street);
        expect(result.address.city).toBe(input.city);
        expect(result.address.state).toBe(input.state);
        expect(result.items).toBeDefined();
        expect(result.items).toHaveLength(3);
        expect(result.items.map(i => {
            expect(i.id).toBeDefined();
            expect(i.name).toBe('ITEM');
            expect(i.price).toBe(100);
        }))
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
        expect(result.total).toBe(300);
    });

    it('should find a invoice by id', async () => {
        // given
        const id = uuuidv4();
        const input = new Invoice({
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

        await repository.add(input);

        // when
        const result = await facade.find({ id });

        // then
        expect(result).toBeDefined();
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.address.street).toBe(input.address.street);
        expect(result.address.city).toBe(input.address.city);
        expect(result.address.state).toBe(input.address.state);
        expect(result.items).toBeDefined();
        expect(result.items).toHaveLength(2);
        expect(result.items.map(i => {
            expect(i.id).toBeDefined();
            expect(i.name).toBe('ITEM');
            expect(i.price).toBe(100);
        }))
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
        expect(result.total).toBe(200);
    });

});