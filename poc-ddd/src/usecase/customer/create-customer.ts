import CustomerFactory from "../../domain/customer-module/factory/customer.factory";
import CustomerRepository from "../../domain/customer-module/repository/customer.repository";

export default class CreateCustomer {

    constructor(private customerRepository: CustomerRepository) {
    }

    public async execute(input: Input): Promise<Output> {
        const newCustomer = CustomerFactory.createWithAddress(
            input.name,
            input.street,
            input.number,
            input.city,
            input.state,
            input.zip
        );
        await this.customerRepository.create(newCustomer);
        return {
            id: newCustomer.id,
            name: newCustomer.name,
            address: {
                street: newCustomer.address?.street,
                number: newCustomer.address?.number,
                city: newCustomer.address?.city,
                zip: newCustomer.address?.zip,
                state: newCustomer.address?.state
            }
        } as Output;
    }
}

type Input = {
    name: string,
    street: string,
    number: string,
    city: string,
    zip: string,
    state: string
}

type Output = {
    id: string,
    name: string,
    address: {
        street: string,
        number: string,
        city: string,
        zip: string,
        state: string
    }
}