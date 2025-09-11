import UUID from '../../../src/domain/@shared/vo/uuid';
import CustomerRepository from '../../../src/domain/customer-module/repository/customer.repository';
import CustomerMemoryRepository from '../../../src/infrastructure/customer-module/repository/memory/customer.memory-repository.impl';
import CreateCustomer from '../../../src/usecase/customer/create-customer';
import UpdateCustomer from '../../../src/usecase/customer/update-customer';

describe('Update customer use case unit test', () => {
    let repository: CustomerRepository;
    let useCase: UpdateCustomer;
    let createCustomerUseCase: CreateCustomer;

    beforeEach(() => {
        repository = new CustomerMemoryRepository();
        createCustomerUseCase = new CreateCustomer(repository);
        useCase = new UpdateCustomer(repository);
    })

    it('should change customer name', async () => {
        // given
        const customer = await createCustomerUseCase.execute({
            name: 'Aristides D. Neto',
            street: 'Street',
            number: 'Number',
            city: 'City',
            zip: '00000000',
            state: 'State'
        }
        );

        const input = {
            id: customer.id,
            name: 'Aristides Debortoli Neto'
        }

        // when
        const result = await useCase.execute(input)

        // then
        expect(result).toBeDefined()
        expect(result.id).toBe(customer.id)
        expect(result.name).toBe('Aristides Debortoli Neto')
        expect(result.address.street).toBe('Street')
        expect(result.address.number).toBe('Number')
        expect(result.address.city).toBe('City')
        expect(result.address.zip).toBe('00000000')
        expect(result.address.state).toBe('State')
        expect(result.rewardPoints).toBe(0)
    });

    it('should change customer address', async () => {
        // given
        const customer = await createCustomerUseCase.execute(
            {
                name: 'Aristides D. Neto',
                street: 'Street',
                number: 'Number',
                city: 'City',
                zip: '00000000',
                state: 'State'
            }
        );

        const input = {
            id: customer.id,
            address: {
                street: 'Rua Belarmino Pinto',
                number: '374',
                city: 'Baixo Guandu',
                zip: '29730000',
                state: 'ES'
            }
        }

        // when
        const result = await useCase.execute(input)

        // then
        expect(result).toBeDefined()
        expect(result.id).toBe(customer.id)
        expect(result.address.street).toBe('Rua Belarmino Pinto')
        expect(result.address.number).toBe('374')
        expect(result.address.city).toBe('Baixo Guandu')
        expect(result.address.zip).toBe('29730000')
        expect(result.address.state).toBe('ES')
    });

    it('should add rewards points of customer', async () => {
        // given
        const customer = await createCustomerUseCase.execute(
            {
                name: 'Aristides D. Neto',
                street: 'Street',
                number: 'Number',
                city: 'City',
                zip: '00000000',
                state: 'State'
            }
        );

        const input = {
            id: customer.id,
            rewardPoints: 10
        }

        // when
        const result = await useCase.execute(input)

        // then
        expect(result).toBeDefined()
        expect(result.id).toBe(customer.id)
        expect(result.rewardPoints).toBe(10)
    });

    it('should throw error when update invalid customer', async () => {
        // given
        const input = {
            id: UUID.create().getValue(),
            name: 'Aristides Debortoli Neto'
        }

        // then
        await expect(useCase.execute(input)).rejects.toThrow('Customer not found')
    });

    it('should throw error when update customer with invalid name', async () => {
        // given
        const customer = await createCustomerUseCase.execute(
            {
                name: 'Aristides D. Neto',
                street: 'Street',
                number: 'Number',
                city: 'City',
                zip: '00000000',
                state: 'State'
            }
        );

        const input = {
            id: customer.id,
            name: ''
        }

        // then
        await expect(useCase.execute(input)).rejects.toThrow("Invalid name")
    });

    it('should throw error when update customer with invalid address', async () => {
        // given
        const customer = await createCustomerUseCase.execute(
            {
                name: 'Aristides D. Neto',
                street: 'Street',
                number: 'Number',
                city: 'City',
                zip: '00000000',
                state: 'State'
            }
        );

        // then
        await expect(useCase.execute({
            id: customer.id,
            address: {
                street: '',
                number: '',
                city: '',
                zip: '',
                state: ''
            }
        })).rejects.toThrow("Field street must be provided")
        
        await expect(useCase.execute({
            id: customer.id,
            address: {
                street: 'Street',
                number: '',
                city: '',
                zip: '',
                state: ''
            }
        })).rejects.toThrow("Field number must be provided")

        await expect(useCase.execute({
            id: customer.id,
            address: {
                street: 'City',
                number: 'Number',
                city: '',
                zip: '',
                state: ''
            }
        })).rejects.toThrow("Field city must be provided")

        await expect(useCase.execute({
            id: customer.id,
            address: {
                street: 'Street',
                number: 'Number',
                city: 'City',
                state: 'State',
                zip: '',
            }
        })).rejects.toThrow("Field zip must be provided")
        
        await expect(useCase.execute({
            id: customer.id,
            address: {
                street: 'Street',
                number: 'Number',
                city: 'City',
                state: 'State',
                zip: '',
            }
        })).rejects.toThrow("Field zip must be provided")

        await expect(useCase.execute({
            id: customer.id,
            address: {
                street: 'Street',
                number: 'Number',
                city: 'City',
                state: 'State',
                zip: 'ABC000000',
            }
        })).rejects.toThrow("Invalid zip format, expected 8 numbers digits")
    });

    it('should throw error when update customer with invalid reward points', async () => {
        // given
        const customer = await createCustomerUseCase.execute(
            {
                name: 'Aristides D. Neto',
                street: 'Street',
                number: 'Number',
                city: 'City',
                zip: '00000000',
                state: 'State'
            }
        );

        const input = {
            id: customer.id,
            rewardPoints: -1
        }

        // then
        await expect(useCase.execute(input)).rejects.toThrow("Rewards points should be greater zero")
    });

});