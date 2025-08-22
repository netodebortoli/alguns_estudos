import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../src/domain/customer-module/entity/customer';
import Address from '../../../src/domain/customer-module/vo/address';
import CustomerModel from '../../../src/infrastructure/customer-module/repository/sequelize/customer.model';
import CustomerRepositoryImpl from '../../../src/infrastructure/customer-module/repository/sequelize/customer.repository.impl';

describe("Customer repository integration test", () => {

    let sequelize: Sequelize;

    // Inicializa o sequelize a cada teste
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:', // Banco de dados em memória
            logging: false,
            sync: { force: true } // Sincroniza o modelo (os 'models') com o banco de dados.
        });
        sequelize.addModels([CustomerModel])
        await sequelize.sync();
    });

    // Fecha a conexão do sequelize a cada teste
    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        // given
        const customerRepository = new CustomerRepositoryImpl();
        const address = new Address("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        const customer = new Customer("Aristides D. Neto", address);

        // when
        await customerRepository.create(customer);

        // then
        const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });
        expect(customerModel).toBeDefined();
        expect(customerModel?.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address?.street,
            number: customer.address?.number,
            city: customer.address?.city,
            state: customer.address?.state,
            zip: customer.address?.zip,
            status: customer.isActive,
            rewardPoints: customer.rewardPoints
        });
    });

    it('should create a customer withou address', async () => {
        // given
        const customerRepository = new CustomerRepositoryImpl();
        const customer = new Customer("Aristides D. Neto");

        // when
        await customerRepository.create(customer);

        // then
        const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });
        expect(customerModel).toBeDefined();
        expect(customerModel?.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: null,
            number: null,
            city: null,
            state: null,
            zip: null,
            status: false,
            rewardPoints: customer.rewardPoints
        });
    });

    it('should update a customer', async () => {
        // given
        const customerRepository = new CustomerRepositoryImpl();
        const address = new Address("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        const customer = new Customer("Aristides D. Neto", address);
        await customerRepository.create(customer);

        // when
        customer.changeName("Jonas");
        customer.addRewardPoints(100);
        customer.activate();
        await customerRepository.update(customer);

        // then
        const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });
        expect(customerModel).toBeDefined();
        expect(customerModel?.toJSON()).toStrictEqual({
            id: customer.id,
            name: "Jonas",
            street: customer.address?.street,
            number: customer.address?.number,
            city: customer.address?.city,
            state: customer.address?.state,
            zip: customer.address?.zip,
            status: true,
            rewardPoints: 100
        });
    });

    it('should find customer by id', async () => {
        // given
        const customerRepository = new CustomerRepositoryImpl();
        const address = new Address("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        const customer = new Customer("Aristides D. Neto", address);
        await customerRepository.create(customer);

        // when
        const customerResult = await customerRepository.findById(customer.id);

        expect(customer).toBeDefined()
        expect(customer).toStrictEqual(customerResult)
    });

    it('should throw error when not find customer by id', async () => {
        // given
        const customerRepository = new CustomerRepositoryImpl();

        // when & then
        await expect(customerRepository.findById("AA1233")).rejects.toThrow('Customer not found');
    });

    it('should find all customers', async () => {
        // given
        const customerRepository = new CustomerRepositoryImpl();
        const address = new Address("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        const customer1 = new Customer("Aristides D. Neto", address);
        const customer2 = new Customer("Aristides D. Filho", address);
        const customer3 = new Customer("Elisabete Boone de Souza", address);
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);
        await customerRepository.create(customer3);

        // when
        const result = await customerRepository.findAll();

        // then
        expect(result).toBeDefined()
        expect(result.length).toBe(3)
        expect(result).toContainEqual(customer1)
        expect(result).toContainEqual(customer2)
        expect(result).toContainEqual(customer3)
    });

})