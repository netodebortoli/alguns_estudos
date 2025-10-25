import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import Transaction from "../../../domain/transaction";
import PaymentSequelizeRepositoryImpl from "./payment.sequelize.repository.impl";
import TransactionModel from "./transaction.model";

describe('Payment sequelize repository integration tests', () => {

    const repository = new PaymentSequelizeRepositoryImpl();
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

    it('should create a transaction', async () => {
        // given
        const transaction = new Transaction({
            orderId: uuidv4(),
            amount: 100,
        })

        // when
        await repository.save(transaction);

        // then
        const result = await TransactionModel.findOne({
            where: { id: transaction.id.value },
        });

        expect(result.get()).toBeDefined();
        expect(result.get().id).toBeDefined();
        expect(result.get().id).toBe(transaction.id.value);
        expect(result.get().orderId).toBe(transaction.orderId.value);
        expect(result.get().amount).toBe(transaction.amount);
        expect(result.get().status).toBe(transaction.status);
        expect(result.get().createdAt).toStrictEqual(transaction.createdAt);
        expect(result.get().updatedAt).toStrictEqual(transaction.updatedAt);
    });
});
