import Invoice from "../../../domain/invoice";
import InvoiceGateway, { InvoiceFilter } from "../../../gateway/invoice.gateway";

export default class InvoiceMemoryRepositoryImpl implements InvoiceGateway {

    constructor(private readonly invoices: Invoice[] = []) {
    }

    async add(invoice: Invoice): Promise<void> {
        this.invoices.push(invoice);
    }

    async find(filter: InvoiceFilter): Promise<Invoice> {
        const invoice = this.invoices.find((invoice) => {
            if (filter.id && !filter.document && invoice.id.value === filter.id) {
                return true;
            }
            if (filter.document && !filter.id && invoice.document === filter.document) {
                return true;
            }
            if (filter.id && filter.document && invoice.id.value === filter.id && invoice.document === filter.document) {
                return true;
            }
            return false;
        });
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        return invoice;
    }

}