import Customer from '../../../src/domain/customer-module/entity/customer';

describe('Customer entity unit tests', () => {
    it('should create customer', () => {
        const customer = new Customer("John Doe");
        expect(customer).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.id).toBeDefined();
        expect(customer.rewardPoints).toBe(0)
    });

    it('should change customer name', () => {
        const customer = new Customer("John Doe");
        customer.changeName("Jane Doe");
        expect(customer.name).toBe("Jane Doe");
    });

    it('should throw error when customer is invalid', () => {
        expect(() => new Customer("", "")).toThrow('Customer: Invalid UUID, Customer: Invalid name')
    });

    it('should throw error when change customer name is invalid', () => {
        const customer = new Customer("John Doe");
        expect(() => customer.changeName('')).toThrow('Customer: Invalid name')
    });

    it('should update customer address', () => {
        const customer = new Customer("John Doe");
        customer.updateAddres("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        expect(customer.address).toBeDefined();
        expect(customer.address?.street).toBe("Rua Belarmino Pinto");
        expect(customer.address?.number).toBe("374");
        expect(customer.address?.city).toBe("Baixo Guandu");
        expect(customer.address?.state).toBe("ES");
        expect(customer.address?.zip).toBe("29730000");
        expect(customer.address?.formattedZip).toBe("29730-000");
    });

    it('should throw error when updating address with invalid data', () => {
        const client = new Customer("John Doe");

        expect(() => client.updateAddres("", "", "", "", "")).toThrow('Customer: Field street must be provided, Customer: Field number must be provided, Customer: Field city must be provided, Customer: Field state must be provided, Customer: Field zip must be provided, Customer: Invalid zip format, expected 8 numbers digits')
    });

    it('should deactivate customer', () => {
        const customer = new Customer("John Doe");
        customer.deactivate();
        expect(customer.isActive).toBe(false);
    });

    it('should be activate customer', () => {
        const customer = new Customer("John Doe");
        customer.updateAddres("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");

        customer.activate();

        expect(customer.isActive).toBe(true);
    });

    it('should update reward points of customer', () => {
        const customer = new Customer("John Doe");
        customer.updateAddres("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000")
        const totalAmount = 100;
        customer.addRewardPoints(totalAmount);
        expect(customer.rewardPoints).toBe(100);
        customer.addRewardPoints(totalAmount);
        expect(customer.rewardPoints).toBe(200);
    });

    it('should throw error when activating customer without address', () => {
        const customer = new Customer("John Doe");

        expect(() => customer.activate()).toThrow('Customer: Address cannot be empty when activating')
    });

    it('should throw error when update rewards points with invalid value', () => {
        const customer = new Customer("John Doe");
        customer.updateAddres("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000")

        expect(() => customer.addRewardPoints(0)).toThrow('Customer: Rewards points should be greater zero')
    });
});