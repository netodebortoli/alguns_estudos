import Customer from '../../../src/domain/customer-module/entity/customer';
import Address from '../../../src/domain/customer-module/vo/address';
import CustomerMemoryRepository from '../../../src/infrastructure/customer-module/repository/memory/customer.memory-repository.impl';
import FindCustomer from '../../../src/usecase/customer/find-customer';

describe('Find customer use case unit test', () => {
    const repository = new CustomerMemoryRepository();
    const useCase = new FindCustomer(repository);
    
    it('should find a customer', async () => {
        // given
        const addres = new Address('Street', '1', 'City', 'State', '29730000')
        const newCustomer = new Customer('Aristides D. Neto', addres);
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

    it('should throw error when not find customer', async () => {
        const input = {
            id: ''
        };
        await expect(() => useCase.execute(input)).rejects.toThrow('Customer not found')
    });

});