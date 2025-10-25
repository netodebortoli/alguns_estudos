import { v4 as uuidv4 } from 'uuid';
import ProcessPaymentUseCase from "./process-payment.usecase";

describe('Process payment usecase unit tests', () => {

    it('should process a payment', async () => {
        const repository = {
            save: jest.fn()
        }

        const useCase = new ProcessPaymentUseCase(repository);

        // given
        const id = uuidv4();
        const orderId = uuidv4();
        const input = {
            id: id,
            amount: 199,
            orderId: orderId
        }

        // when
        const result = await useCase.execute(input);

        // then
        expect(repository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(id);
        expect(result.orderId).toBe(orderId);
        expect(result.amount).toBe(199);
        expect(result.status).toBe('approved');
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })

    it('should decline a transaction', async () => {
        const repository = {
            save: jest.fn()
        }

        const useCase = new ProcessPaymentUseCase(repository);

        // given
        const id = uuidv4();
        const orderId = uuidv4();
        const input = {
            id: id,
            amount: 99,
            orderId: orderId
        }

        // when
        const result = await useCase.execute(input);

        // then
        expect(repository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(id);
        expect(result.orderId).toBe(orderId);
        expect(result.amount).toBe(99);
        expect(result.status).toBe('declined');
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })

});