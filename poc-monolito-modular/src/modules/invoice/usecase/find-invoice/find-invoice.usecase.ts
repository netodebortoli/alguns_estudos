import UseCase from "../../../@shared/domain/usecase/use-case";
import InvoiceItem from "../../domain/invoice.item";
import InvoiceGateway from "../../gateway/invoice.gateway";

export default class FindInvoiceUseCase implements UseCase {

    constructor(private readonly invoiceRepository: InvoiceGateway) {
    }

    async execute(input: Input): Promise<Output> {
        const invoice = await this.invoiceRepository.find({ id: input.id });
        if (!invoice) {
            throw new Error(`Invoice with id ${input.id} not found`);
        }
        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                city: invoice.address.city,
                state: invoice.address.state,
            },
            items: invoice.items.map(this.toOutputItem),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            total: invoice.total,
        };
    }

    private toOutputItem(item: InvoiceItem) {
        return {
            id: item.id.value,
            name: item.name.toUpperCase(),
            price: item.price,
        };
    }
}

type Input = {
    id: string;
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