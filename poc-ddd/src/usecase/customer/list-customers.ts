import Customer from "../../domain/customer-module/entity/customer";
import CustomerRepository from "../../domain/customer-module/repository/customer.repository";

export default class ListCustomers {

    constructor(private customerRepository: CustomerRepository) {
    }

    public async execute(): Promise<Output> {
        const customers = await this.customerRepository.findAll()
        return {
            customers: customers.map(this.toCustomerOutput)
        } as Output;
    }

    private toCustomerOutput(customer: Customer): CustomerOutput {
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address?.street || '',
                number: customer.address?.number || '',
                city: customer.address?.city || '',
                state: customer.address?.state || '',
                zip: customer.address?.zip || ''
            }
        };
    }
}

type Output = {
    customers: CustomerOutput[]
}

type CustomerOutput = {
    id: string,
    name: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        zip: string;
    };
}