import Client from "../../domain/client";
import FindClientUseCase from "./find-client.usecase";

describe('Find client usecase unit tests', () => {

    it('should find a client', async () => {
        const client = new Client({
            name: 'Client',
            email: 'email@example.com',
            street: 'street',
            city: 'city',
            state: 'state'
        });

        const repository = {
            add: jest.fn(),
            findById: jest.fn().mockResolvedValue(Promise.resolve(client)),
        }

        const useCase = new FindClientUseCase(repository);

        // given
        const input = {
            clientId: client.id.value,
        }

        // when
        const output = await useCase.execute(input);

        // then
        expect(repository.findById).toHaveBeenCalledWith(input.clientId);
        expect(output.id).toBe(client.id.value);
        expect(output.name).toBe(client.name);
        expect(output.email).toBe(client.email);
        expect(output.street).toBe(client.address.street);
        expect(output.city).toBe(client.address.city);
        expect(output.state).toBe(client.address.state);
        expect(output.createdAt).toBe(client.createdAt);
        expect(output.updatedAt).toBe(client.updatedAt);
    });


    it('should throw error when find a client', async () => {
        const repository = {
            add: jest.fn(),
            findById: jest.fn().mockImplementation(() => {
                throw new Error("Client not found");
            }),
        }

        const useCase = new FindClientUseCase(repository);

        // given
        const input = {
            clientId: '1',
        }

        // when & then
        await expect(useCase.execute(input)).rejects.toThrow("Client not found");
        expect(repository.findById).toHaveBeenCalled();
    });

});