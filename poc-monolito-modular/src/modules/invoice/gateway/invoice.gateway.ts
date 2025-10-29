import Invoice from "../domain/invoice";

export default interface InvoiceGateway {
    add(invoice: Invoice): Promise<void>;
    find(filter: InvoiceFilter): Promise<Invoice>;
}

export type InvoiceFilter = {
    id?: string;
    document?: string;
}