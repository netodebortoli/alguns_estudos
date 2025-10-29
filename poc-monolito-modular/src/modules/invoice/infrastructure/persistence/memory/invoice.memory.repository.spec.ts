import { v4 as uuuidv4 } from 'uuid';
import Invoice from '../../../domain/invoice';
import InvoiceMemoryRepositoryImpl from './invoice.memory.repository.impl';

describe('Invoice memory repository unit tests', () => {

    it('should add a invoice and find by id', async () => {
        // given
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
        const repository = new InvoiceMemoryRepositoryImpl();

        // when
        await repository.add(invoice);

        // then
        const foundInvoice = await repository.find({ id: id });
        expect(foundInvoice).toBeDefined();
        expect(foundInvoice.id.value).toBe(id);
    });

    it('should add a invoice and find by document', async () => {
        // given
        const document = '11223344';
        const invoice = new Invoice({
            id: uuuidv4(),
            name: 'invoice',
            document: document,
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
        const repository = new InvoiceMemoryRepositoryImpl();

        // when
        await repository.add(invoice);

        // then
        const foundInvoice = await repository.find({ document });
        expect(foundInvoice).toBeDefined();
        expect(foundInvoice.document).toBe(invoice.document);
    });

    it('should add a invoice and find by document and id', async () => {
        // given
        const id = uuuidv4();
        const document = '001234';
        const invoice = new Invoice({
            id: id,
            name: 'invoice',
            document: document,
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
        const repository = new InvoiceMemoryRepositoryImpl();

        // when
        await repository.add(invoice);

        // then
        const foundInvoice = await repository.find({ id, document });
        expect(foundInvoice).toBeDefined();
        expect(foundInvoice.id.value).toBe(invoice.id.value);
        expect(foundInvoice.document).toBe(invoice.document);
    });

    it('should throw error when find a invoice that does not exist', async () => {
        // given
        const repository = new InvoiceMemoryRepositoryImpl();

        // when & then
        expect(repository.find({ id: '000000111112343' })).rejects.toThrow('Invoice not found');
        expect(repository.find({ document: '11223344' })).rejects.toThrow('Invoice not found');
    });

})