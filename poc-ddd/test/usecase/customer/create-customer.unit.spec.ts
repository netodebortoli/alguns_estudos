import CustomerMemoryRepository from '../../../src/infrastructure/customer-module/repository/memory/customer.memory-repository.impl';
import CreateCustomer from '../../../src/usecase/customer/create-customer';

describe('Create customer use case unit test', () => {
    const repository = new CustomerMemoryRepository();
    const useCase = new CreateCustomer(repository);
    
    it('should create a customer', async () => {
        // given
        const input = {
            name: 'Aristides D. Neto',
            street: 'Street',
            number: 'Number',
            city: 'City',
            zip: '29730000',
            state: 'State'
        }; 

        // when
        const result = await useCase.execute(input);

        // then
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe('Aristides D. Neto');
        expect(result.address?.street).toBe('Street');
        expect(result.address?.number).toBe('Number');
        expect(result.address?.city).toBe('City');
        expect(result.address?.state).toBe('State');
        expect(result.address?.zip).toBe('29730000');
    });

    it('should throw error when create customer with invalid data', async () => {
        const inputInvalidAddress = {
            name: 'Aristides D. Neto',
            street: '',
            number: '',
            city: '',
            zip: '',
            state: ''
        };
        await expect(() => useCase.execute(inputInvalidAddress)).rejects.toThrow()
        
        const inputInvalidName = {
            name: '',
            street: 'Street',
            number: 'Number',
            city: 'City',
            zip: '29730000',
            state: ''
        };
        await expect(() => useCase.execute(inputInvalidName)).rejects.toThrow('Invalid name')
    });

});