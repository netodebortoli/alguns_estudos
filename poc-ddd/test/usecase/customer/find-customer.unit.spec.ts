import Customer from '../../../src/domain/customer-module/entity/customer';
import CustomerMemoryRepository from '../../../src/infrastructure/customer-module/repository/memory/customer.memory-repository.impl';
import FindCustomer from '../../../src/usecase/customer/find-customer';

describe('Find customer use case unit test', () => {
    const repository = new CustomerMemoryRepository();
    const useCase = new FindCustomer(repository);
    
    it('should find a customer', async () => {
        // given
        const newCustomer = new Customer('Aristides D. Neto');
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
                street: "",
                number: "",
                city: "",
                state: "",
                zip: ""
            }
        })
    });

    it('should throw error when not find customer', async () => {
        const input = {
            id: ''
        };
        await expect(() => useCase.execute(input)).rejects.toThrow('Customer not found')
    });

});