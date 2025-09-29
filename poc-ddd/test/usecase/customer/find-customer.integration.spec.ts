import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../src/domain/customer-module/entity/customer';
import Address from '../../../src/domain/customer-module/vo/address';
import CustomerModel from '../../../src/infrastructure/customer-module/repository/sequelize/customer.model';
import CustomerRepositoryImpl from '../../../src/infrastructure/customer-module/repository/sequelize/customer.repository.impl';
import FindCustomer from '../../../src/usecase/customer/find-customer';

describe('Find customer use case integration test', () => {
    let sequelize: Sequelize;

    // Inicializa o sequelize em cada teste
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
   
    it('should find a customer', async () => {
        const repository = new CustomerRepositoryImpl();
        const useCase = new FindCustomer(repository);
        // given
        const newCustomer = new Customer('Aristides D. Neto');
        newCustomer.updateAddres('Street', '1', 'City', 'State', '29730000')
        await repository.create(newCustomer);

        // when
        const input = {
            id: newCustomer.id
        }; 
        const result = await useCase.execute(input);

        // then
        expect(result).toBeDefined();
        expect(result).toStrictEqual({
            id: newCustomer.id,
            name: newCustomer.name,
            address: {
                street: newCustomer.address?.street,
                number: newCustomer.address?.number,
                city: newCustomer.address?.city,
                state: newCustomer.address?.state,
                zip: newCustomer.address?.formattedZip
            }
        })
    });

});