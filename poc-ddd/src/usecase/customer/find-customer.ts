import CustomerRepository from "../../domain/customer-module/repository/customer.repository";

export default class FindCustomer {

    constructor(private customerRepository: CustomerRepository) {
    }

    public async execute(input: Input): Promise<Output> {
        const customer = await this.customerRepository.findById(input.id);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address?.street || '',
                number: customer.address?.number || '',
                city: customer.address?.city || '',
                state: customer.address?.state || '',
                zip: customer.address?.formattedZip || ''
            }
        };
    }
}

type Input = {
    id: string;
}

type Output = {
    id: string,
    name: string;
    address: {
        street: string | undefined;
        number: string | undefined;
        city: string | undefined;
        state: string | undefined;
        zip: string | undefined;
    };
}