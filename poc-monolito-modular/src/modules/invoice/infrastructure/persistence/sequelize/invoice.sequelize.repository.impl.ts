import Invoice from "../../../domain/invoice";
import InvoiceGateway, { InvoiceFilter } from "../../../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";

export default class InvoiceSequelizeRepositoryImpl implements InvoiceGateway {

    async add(invoice: Invoice): Promise<void> {
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
    }

    async find(filter: InvoiceFilter): Promise<Invoice> {
        let invoice!: InvoiceModel;
        if (filter.id && filter.document) {
            invoice = await InvoiceModel.findOne({ where: { id: filter.id, document: filter.document }, include: [InvoiceItemModel] });
        }
        if (filter.id && !filter.document) {
            invoice = await InvoiceModel.findOne({ where: { id: filter.id }, include: [InvoiceItemModel] });
        }
        if (filter.document && !filter.id) {
            invoice = await InvoiceModel.findOne({ where: { document: filter.document }, include: [InvoiceItemModel] });
        }
        if (!invoice) {
            throw new Error('Invoice not found');
        }
        return InvoiceModel.toDomain(invoice);
    }

}