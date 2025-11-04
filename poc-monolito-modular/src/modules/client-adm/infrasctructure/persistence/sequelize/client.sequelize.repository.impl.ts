import Client from "../../../domain/client";
import ClientGateway from "../../../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientSequelizeRepositoryImpl implements ClientGateway {

    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            email: client.email,
            street: client.address.street,
            city: client.address.city,
            state: client.address.state,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }

    async findById(id: string): Promise<Client> {
        const client = await ClientModel.findOne({
            where: { id: id }
        })

        if (!client || client === null) {
            throw new Error(`Client with id ${id} not found`);
        }

        return ClientModel.toDomain(client);
    }

}

