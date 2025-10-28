import { v4 as uuidv4 } from 'uuid';
import PaymentFacadeFactory from '../infrasctructure/factory/payment.facade.factory';
import { Sequelize } from 'sequelize-typescript';
import TransactionModel from '../infrasctructure/persistence/sequelize/transaction.model';

describe('Payment facade integration tests', () => {

    const facade = PaymentFacadeFactory.create();
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
        const transaction = await TransactionModel.findOne({ where: { id: result.transactionId } });
        expect(result).toBeDefined();
        expect(transaction.get()).toBeDefined();
        expect(transaction.get().id).toBe(result.transactionId);
        expect(transaction.get().orderId).toBe(result.orderId);
        expect(transaction.get().amount).toBe(result.amount);
        expect(transaction.get().status).toBe('approved');
        expect(transaction.get().createdAt).toBeInstanceOf(Date);
        expect(transaction.get().updatedAt).toBeInstanceOf(Date);

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