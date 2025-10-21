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
            address: input.address,
        };

        const client = new Client(props);

        await this.clientRepository.add(client);

        return {
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }

}

type Input = {
    name: string;
    email: string;
    address: string;
}

type Output = {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}