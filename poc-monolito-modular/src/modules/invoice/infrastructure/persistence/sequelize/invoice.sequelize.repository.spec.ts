import { Sequelize } from "sequelize-typescript";
import { v4 as uuuidv4 } from "uuid";
import Invoice from "../../../domain/invoice";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import InvoiceSequelizeRepositoryImpl from "./invoice.sequelize.repository.impl";

describe('Invoice sequelize repository integration tests', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a invoice', async () => {
        const repository = new InvoiceSequelizeRepositoryImpl();

        // given
        const invoiceId = uuuidv4()
        const invoice = new Invoice({
            id: invoiceId,
            name: 'name',
            document: '11223344',
            address: {
                street: 'Street',
                city: 'City',
                state: 'State',
            },
            items: [
                {
                    name: 'item 1',
                    price: 100
                },
                {
                    name: 'item 2',
                    price: 200
                },
            ],
        });

        // when
        await repository.add(invoice);

        // then
        const result = await InvoiceModel.findOne({ where: { id: invoiceId }, include: [InvoiceItemModel] });

        expect(result.get()).toBeDefined();
        expect(result.get().id).toBeDefined();
        expect(result.get().id).toBe(invoice.id.value);
        expect(result.get().name).toBe(invoice.name);
        expect(result.get().street).toBe(invoice.address.street);
        expect(result.get().city).toBe(invoice.address.city);
        expect(result.get().state).toBe(invoice.address.state);
        expect(result.get().createdAt).toStrictEqual(invoice.createdAt);
        expect(result.get().updatedAt).toStrictEqual(invoice.updatedAt);
        expect(result.get().items).toHaveLength(2);

        result.get().items.forEach((item: InvoiceItemModel, index: number) => {
            expect(item.get().id).toBe(invoice.items[index].id.value);
            expect(item.get().name).toBe(invoice.items[index].name);
            expect(item.get().price).toBe(invoice.items[index].price);
        });
    });

    it('should find a invoice by id', async () => {
        const repository = new InvoiceSequelizeRepositoryImpl();

        // given
        const invoiceId = uuuidv4()
        const invoice = new Invoice({
            id: invoiceId,
            name: 'name',
            document: '11223344',
            address: {
                street: 'Street',
                city: 'City',
                state: 'State',
            },
            items: [
                {
                    name: 'item 1',
                    price: 100
                },
                {
                    name: 'item 2',
                    price: 200
                },
            ],
        });

        await InvoiceModel.create({
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            city: invoice.address.city,
            state: invoice.address.state,
            items: invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                invoiceId: invoice.id.value
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        }, { include: [{ association: 'items' }] });

        // when
        const result = await repository.find({ id: invoiceId });

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.id.value).toBe(invoice.id.value);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].id.value).toBe(invoice.items[0].id.value);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id.value).toBe(invoice.items[1].id.value);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.createdAt).toStrictEqual(invoice.createdAt);
        expect(result.updatedAt).toStrictEqual(invoice.updatedAt);
    });

    it('should find a invoice by document', async () => {
        const repository = new InvoiceSequelizeRepositoryImpl();

        // given
        const document = '11223344';
        const invoice = new Invoice({
            name: 'name',
            document: document,
            address: {
                street: 'Street',
                city: 'City',
                state: 'State',
            },
            items: [
                {
                    name: 'item 1',
                    price: 100
                },
                {
                    name: 'item 2',
                    price: 200
                },
            ],
        });

        await InvoiceModel.create({
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            city: invoice.address.city,
            state: invoice.address.state,
            items: invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                invoiceId: invoice.id.value
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        }, { include: [{ association: 'items' }] });

        // when
        const result = await repository.find({ document });

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.id.value).toBe(invoice.id.value);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].id.value).toBe(invoice.items[0].id.value);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id.value).toBe(invoice.items[1].id.value);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.createdAt).toStrictEqual(invoice.createdAt);
        expect(result.updatedAt).toStrictEqual(invoice.updatedAt);
    });

    it('should find a invoice by document and id', async () => {
        const repository = new InvoiceSequelizeRepositoryImpl();

        // given
        const id = uuuidv4();
        const document = '11223344';
        const invoice = new Invoice({
            id: id,
            document: document,
            name: 'name',
            address: {
                street: 'Street',
                city: 'City',
                state: 'State',
            },
            items: [
                {
                    name: 'item 1',
                    price: 100
                },
                {
                    name: 'item 2',
                    price: 200
                },
            ],
        });

        await InvoiceModel.create({
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            city: invoice.address.city,
            state: invoice.address.state,
            items: invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                invoiceId: invoice.id.value
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        }, { include: [{ association: 'items' }] });

        const otherId = uuuidv4();
        const otherInvoice = new Invoice({
            id: otherId,
            document: "other-document",
            name: 'name',
            address: {
                street: 'Street',
                city: 'City',
                state: 'State',
            },
            items: [
                {
                    name: 'item 1',
                    price: 100
                },
                {
                    name: 'item 2',
                    price: 200
                },
            ],
        });
        await InvoiceModel.create({
            id: otherId,
            name: otherInvoice.name,
            document: "other-document",
            street: otherInvoice.address.street,
            city: otherInvoice.address.city,
            state: otherInvoice.address.state,
            items: otherInvoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt, 
                invoiceId: otherId
            })),
            createdAt: otherInvoice.createdAt,
            updatedAt: otherInvoice.updatedAt
        }, { include: [{ association: 'items' }] });

        // when
        const result = await repository.find({ document: document, id: id });

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.id.value).toBe(invoice.id.value);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].id.value).toBe(invoice.items[0].id.value);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id.value).toBe(invoice.items[1].id.value);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.createdAt).toStrictEqual(invoice.createdAt);
        expect(result.updatedAt).toStrictEqual(invoice.updatedAt);
    });

});