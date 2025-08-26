import CustomerFactory from '../../../src/domain/customer-module/factory/customer.factory';

describe('Customer factory unit test', () => {
    it('should create customer', () => {
        const customer = CustomerFactory.create('Aristides D. Neto');

        expect(customer).toBeDefined();
        expect(customer.name).toBe('Aristides D. Neto');
    })  

    it('should create customer with address', () => {
        const customer = CustomerFactory.createWithAddress('Aristides D. Neto', 'Rua 1', '1', 'Baixo Guandu', 'ES', '29730000');
        
        expect(customer).toBeDefined();
        expect(customer.name).toBe('Aristides D. Neto');
        expect(customer.address).toBeDefined();
        expect(customer.address?.street).toBe('Rua 1');
        expect(customer.address?.number).toBe('1');
        expect(customer.address?.city).toBe('Baixo Guandu');
        expect(customer.address?.state).toBe('ES');
    })
})