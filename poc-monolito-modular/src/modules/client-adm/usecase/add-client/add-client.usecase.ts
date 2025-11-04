import UseCase from "../../../@shared/domain/usecase/use-case";
import Client from "../../domain/client";
import ClientGateway from "../../gateway/client.gateway";

export default class AddClientUseCase implements UseCase {

    constructor(private readonly clientRepository: ClientGateway) {
    }

    async execute(input: Input): Promise<Output> {
        const props = {
            name: input.name,
            email: input.email,
            street: input.street,
            city: input.city,
            state: input.state,
        };

        const client = new Client(props);

        await this.clientRepository.add(client);

        return {
            id: client.id.value,
            name: client.name,
            email: client.email,
            street: client.address.street,
            city: client.address.city,
            state: client.address.state,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }

}

type Input = {
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
}

type Output = {
    id: string;
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
}