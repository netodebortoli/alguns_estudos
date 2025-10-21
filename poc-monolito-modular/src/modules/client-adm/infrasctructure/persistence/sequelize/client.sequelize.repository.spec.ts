import { Sequelize } from "sequelize-typescript";
import Client from "../../../domain/client";
import ClientModel from "./client.model";
import ClientSequelizeRepositoryImpl from "./client.sequelize.repository.impl";

describe('Client sequelize repository integration tests', () => {
    let sequelize: Sequelize;

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
        const repository = new ClientSequelizeRepositoryImpl();

        // given
        const client = new Client({
            name: 'Client',
            email: 'email@client.com',
            address: 'Address',
        });

        // when
        await repository.add(client);

        // then
        const result = await ClientModel.findOne({
            where: { id: client.id.value },
        });

        expect(result.get()).toBeDefined();
        expect(result.get().id).toBeDefined();
        expect(result.get().id).toBe(client.id.value);
        expect(result.get().name).toBe(client.name);
        expect(result.get().address).toBe(client.address);
        expect(result.get().email).toBe(client.email);
        expect(result.get().createdAt).toStrictEqual(client.createdAt);
        expect(result.get().updatedAt).toStrictEqual(client.updatedAt);
    });

    it('should find a client by id', async () => {
        const repository = new ClientSequelizeRepositoryImpl();

        // given
        const client = new Client({
            name: 'Client',
            email: 'email@client.com',
            address: 'Address',
        });

        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });

        // when
        const result = await repository.findById(client.id.value);

        // then
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.id.value).toBe(client.id.value);
        expect(result.name).toBe(client.name);
        expect(result.address).toBe(client.address);
        expect(result.email).toBe(client.email);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
    });

    it('should throw error when not find a client by id', async () => {
        const repository = new ClientSequelizeRepositoryImpl();
        await expect(() => repository.findById('11223344')).rejects.toThrow('Client with id 11223344 not found');
    });

});