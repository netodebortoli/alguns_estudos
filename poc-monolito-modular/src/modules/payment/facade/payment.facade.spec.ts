import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import PaymentFacadeFactory from '../infrasctructure/factory/payment.facade.factory';
import PaymentMemoryRepositoryImpl from '../infrasctructure/persistence/memory/payment.memory.repository.impl';
import TransactionModel from '../infrasctructure/persistence/sequelize/transaction.model';

describe('Payment facade integration tests', () => {

    const repository = new PaymentMemoryRepositoryImpl();
    const facade = PaymentFacadeFactory.create(repository);
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should process payment successfully', async () => {
        // given
        const input = {
            amount: 100,
            orderId: uuidv4(),
        };

        // when
        const result = await facade.processTransaction(input);

        // then
        const transaction = await repository.find(result.transactionId);
        expect(result).toBeDefined();
        expect(transaction).toBeDefined();
        expect(transaction.id.value).toBe(result.transactionId);
        expect(transaction.orderId.value).toBe(result.orderId);
        expect(transaction.amount).toBe(result.amount);
        expect(transaction.status).toBe('approved');
        expect(transaction.createdAt).toBeInstanceOf(Date);
        expect(transaction.updatedAt).toBeInstanceOf(Date);
    })

    it('should not process payment', async () => {
        // given
        const input = {
            amount: -99,
            orderId: uuidv4(),
        };

        // when
        const result = await facade.processTransaction(input);

        // then
        expect(result).toBeDefined();
        expect(result.transactionId).toBeDefined();
        expect(result.orderId).toBe(input.orderId);
        expect(result.amount).toBe(input.amount);
        expect(result.status).toBe('declined');
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    })

});