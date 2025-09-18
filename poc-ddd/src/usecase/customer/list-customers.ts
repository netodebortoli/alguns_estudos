import CustomerRepository from "../../domain/customer-module/repository/customer.repository";

export default class ListCustomers {

    constructor(private customerRepository: CustomerRepository) {
    }

    public async execute(): Promise<Output> {
        const customers = await this.customerRepository.findAll()
        return {
            customers: customers.map(customer => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address?.street,
                        number: customer.address?.number,
                        city: customer.address?.city,
                        state: customer.address?.state,
                        zip: customer.address?.zip
                    }
                };
            })
        } as Output;
    }
}

type Output = {
    customers: Customer[]
}

type Customer = {
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