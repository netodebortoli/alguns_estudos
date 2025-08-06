import Client from '../../src/entities/client';
import Address from '../../src/vos/address';

describe('Client entity unit tests', () => {
    it('should create client', () => {
        const client = new Client("John Doe");
        expect(client).toBeDefined();
        expect(client.name).toBe("John Doe");
        expect(client.id).toBeDefined();
    });

    it('should change client name', () => {
        const client = new Client("John Doe");
        client.changeName("Jane Doe");
        expect(client.name).toBe("Jane Doe");
    }); 

    it('should throw error when client name is invalid', () => {
        expect(() => new Client('')).toThrow();        
    });

    it('should throw error when change client name is invalid', () => {
        const client = new Client("John Doe");
        expect(() => client.changeName('')).toThrow();
    }); 

    it('should update client address', () => {
        const client = new Client("John Doe");
        client.updateAddres("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        expect(client.address).toBeDefined();
        expect(client.address?.street).toBe("Rua Belarmino Pinto");
        expect(client.address?.number).toBe("374");
        expect(client.address?.city).toBe("Baixo Guandu");
        expect(client.address?.state).toBe("ES");
        expect(client.address?.zip).toBe("29730000");
        expect(client.address?.formattedZip).toBe("29730-000");
    });

    it('should throw error when updating address with invalid data', () => {
        const client = new Client("John Doe");
        expect(() => client.updateAddres("", "", "", "", "")).toThrow();
    });

    it('should deactivate client', () => {
        const client = new Client("John Doe");
        client.deactivate();
        expect(client.isActive).toBe(false);
    });

    it('should be activate client', () => {
        const address = new Address("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        const client = new Client("John Doe", address);
        client.activate();
        expect(client.isActive).toBe(true);
    });

    it('should throw error when activating client without address', () => {
        const client = new Client("John Doe");
        expect(() => client.activate()).toThrow();
    });
});