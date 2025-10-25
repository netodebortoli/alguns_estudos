import Transaction from "./transaction";
import { v4 as uuidv4 } from 'uuid';

describe('Transaction unit tests', () => {
    it('should create a transaction', () => {
        const id = uuidv4();
        const orderId = uuidv4(); 
        const transaction = new Transaction({
            id: id,
            orderId: orderId,
            amount: 199
        })

        expect(transaction.id.value).toBe(id);
        expect(transaction.orderId.value).toBe(orderId);
        expect(transaction.status).toBe('pending');
        expect(transaction.amount).toBe(199);
        expect(transaction.createdAt).toBeDefined();
        expect(transaction.updatedAt).toBeDefined();
    });

    it('should throw error when create a invalid a transaction', () => {
        expect(() => new Transaction({
            orderId: uuidv4(),
            amount: 0
        })).toThrowError('Amount must be greater than zero');
    });

})