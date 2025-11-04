import AddClientUseCase from "./add-client.usecase";

describe('Add client usecase unit tests', () => {

    it('should add a client', async () => {
        const repository = {
            add: jest.fn(),
            findById: jest.fn(),
        }

        const useCase = new AddClientUseCase(repository);

        // given
        const input = {
            name: 'Client',
            email: 'email@example.com',
            street: "street",
            city: 'city',
            state: 'state'
        }

        // when
        const output = await useCase.execute(input);

        // then
        expect(repository.add).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.email).toBe(input.email);
        expect(output.street).toBe(input.street);
        expect(output.city).toBe(input.city);
        expect(output.state).toBe(input.state);
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });

});