import { Sequelize } from "sequelize-typescript";
import ClientModel from "../infrasctructure/persistence/sequelize/client.model";
import ClientFacadeFactory from "../infrasctructure/factory/client-adm.facade.factory";
import Client from "../domain/client";

describe("Client facade integration tests", () => {

    let sequelize: Sequelize;
    const facade = ClientFacadeFactory.create();

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a client', async () => {
        // given
        const input = {
            name: "John Doe",
            email: "john.doe@example.com",
            address: "123 Main St, Anytown, USA"
        }

        // when
        await facade.addClient(input);

        // then
        const client = await ClientModel.findOne({ where: { email: "john.doe@example.com" } });

        expect(client.get()).toBeDefined();
        expect(client.get().id).toBeDefined();
        expect(client.get().name).toBe("John Doe");
        expect(client.get().email).toBe("john.doe@example.com");
        expect(client.get().address).toBe("123 Main St, Anytown, USA");
        expect(client.get().createdAt).toBeDefined();
        expect(client.get().updatedAt).toBeDefined();
    });

    it('should find a client by id', async () => {
        const client = new Client({
            name: "John Doe",
            email: "john.doe@example.com",
            address: "123 Main St, Anytown, USA"
        });

        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });

        // given
        const input = { clientId: client.id.value }

        // when
        const result = await facade.findClient(input);

        // then
        expect(result).toBeDefined();
        expect(result.id).toBe(client.id.value);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
        expect(result.createdAt).toStrictEqual(client.createdAt);
    });

    it('should throw error when find a client by id', async () => {
        // given
        const input = { clientId: "112233" }

        // when & then
        await expect(facade.findClient(input)).rejects.toThrow("Client with id 112233 not found");
    });

});