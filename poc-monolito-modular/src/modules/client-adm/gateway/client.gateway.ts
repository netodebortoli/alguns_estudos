import Client from "../domain/client";

export default interface ClientGateway {
    add(client: Client): Promise<void>;
    findById(id: string): Promise<Client>;
}