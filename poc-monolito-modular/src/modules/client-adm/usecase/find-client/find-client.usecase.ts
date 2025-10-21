import UseCase from "../../../@shared/domain/usecase/use-case";
import ClientGateway from "../../gateway/client.gateway";

export default class FindClientUseCase implements UseCase {

    constructor(private readonly clientRepository: ClientGateway) {
    }

    async execute(input: Input): Promise<Output> {
        const client = await this.clientRepository.findById(input.clientId);

        return {
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }

}

type Input = {
    clientId: string;
}

type Output = {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}