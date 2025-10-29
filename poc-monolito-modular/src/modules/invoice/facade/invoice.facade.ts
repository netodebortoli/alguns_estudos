export default interface InvoiceFacade {
    generate(input: InputGenerateInvoiceDTO): Promise<OutputGenerateInvoiceDTO>;
    find(input: InputFindInvoiceDTO): Promise<OutputFindInvoiceDTO>;
}

export interface InputGenerateInvoiceDTO {
    name: string;
    document: string;
    street: string;
    city: string;
    state: string;
    items: {
        name: string;
        price: number;
    }[];
}

export interface OutputGenerateInvoiceDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        city: string;
        state: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
    total: number;
}

export interface InputFindInvoiceDTO {
    id?: string;
}

export interface OutputFindInvoiceDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        city: string;
        state: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
    total: number;
}