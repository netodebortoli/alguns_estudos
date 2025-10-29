import UseCase from "../../../@shared/domain/usecase/use-case";
import Invoice from "../../domain/invoice";
import InvoiceItem from "../../domain/invoice.item";
import InvoiceGateway from "../../gateway/invoice.gateway";

export default class GenerateInvoiceUseCase implements UseCase {

    constructor(private readonly invoiceRepository: InvoiceGateway) {
    }

    async execute(input: Input): Promise<Output> {
        const invoiceProps = {
            name: input.name,
            document: input.document,
            address: {
                street: input.street,
                city: input.city,
                state: input.state,
            },
            items: input.items.map(i => {
                return {
                    name: i.name,
                    price: i.price
                }
            })
        }

        await this.validate(input);
        const invoice = new Invoice(invoiceProps);
        await this.invoiceRepository.add(invoice);

        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                city: invoice.address.city,
                state: invoice.address.state,
            },
            items: invoice.items.map(this.toItemOutput),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            total: invoice.total
        }
    }

    private async validate(input: Input) {
        let existingInvoice = null;
        try {
            existingInvoice = await this.invoiceRepository.find({ document: input.document });
        } catch (error: any) {
            if (error && error.message !== 'Invoice not found') {
                throw error;
            }
        }
        if (existingInvoice) {
            throw new Error(`Invoice with this document ${input.document} already exists.`);
        }
    }

    private toItemOutput(i: InvoiceItem) {
        return {
            id: i.id.value,
            name: i.name.toUpperCase(),
            price: i.price,
        };
    }
}

type Input = {
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

type Output = {
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