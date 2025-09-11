import Customer from "../../domain/customer-module/entity/customer";
import CustomerRepository from "../../domain/customer-module/repository/customer.repository";

export default class UpdateCustomer {

    constructor(private customerRepository: CustomerRepository) {
    }

    public async execute(input: Input): Promise<Output> {
        let customer = await this.customerRepository.findById(input.id);
        this.updateName(input, customer);
        this.updateAddress(input, customer);
        this.updateRewardPoints(input, customer);
        await this.customerRepository.update(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address?.street,
                number: customer.address?.number,
                city: customer.address?.city,
                zip: customer.address?.zip,
                state: customer.address?.state
            },
            rewardPoints: customer.rewardPoints
        } as Output;
    }


    private updateName(input: Input, customer: Customer) {
        if (input.name !== undefined) {
            customer.changeName(input.name!);
        }
    }
    
    private updateAddress(input: Input, customer: Customer) {
        if (input.address) {
            customer.updateAddres(
                input.address.street,
                input.address.number,
                input.address.city,
                input.address.state,
                input.address.zip
            );
        }
    }

    private updateRewardPoints(input: Input, customer: Customer) {
        if (input.rewardPoints !== undefined) {
            customer.addRewardPoints(input.rewardPoints);
        }
    }
}

type Input = {
    id: string,
    name?: string,
    address?: {
        street: string,
        number: string,
        city: string,
        zip: string,
        state: string,
    }
    rewardPoints?: number
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
    },
    rewardPoints: number
}