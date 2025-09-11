import CustomerRepository from '../../../src/domain/customer-module/repository/customer.repository';
import CustomerMemoryRepository from '../../../src/infrastructure/customer-module/repository/memory/customer.memory-repository.impl';
import CreateCustomer from '../../../src/usecase/customer/create-customer';
import ListCustomers from '../../../src/usecase/customer/list-customers';

describe('List all customers use case unit test', () => {
    let repository: CustomerRepository;
    let useCase: ListCustomers;
    let createCustomerUseCase: CreateCustomer;

    beforeEach(() => {
        repository = new CustomerMemoryRepository();
        createCustomerUseCase = new CreateCustomer(repository);
        useCase = new ListCustomers(repository);
    })

    it('should list customers', async () => {
        // given
        const input1 = {
            name: 'Aristides D. Neto',
            street: 'Street',
            number: 'Number',
            city: 'City',
            zip: '00000000',
            state: 'State'
        }; 
        const input2 = {
            name: 'Amanda Ferreira Merelis',
            street: 'Street',
            number: 'Number',
            city: 'City',
            zip: '00000000',
            state: 'State'
        }; 

        const customer1 = await createCustomerUseCase.execute(input1);
        const customer2 = await createCustomerUseCase.execute(input2);

        // given
        const result = await useCase.execute();
        
        // then
        expect(result).toBeDefined();
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(customer1)
        expect(result[1]).toEqual(customer2)
    });

});