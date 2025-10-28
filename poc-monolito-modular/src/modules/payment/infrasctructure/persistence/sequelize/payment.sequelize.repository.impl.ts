import Transaction from "../../../domain/transaction";
import PaymentGateway from "../../../gateway/payment.gateway";
import TransactionModel from "./transaction.model";

export default class PaymentSequelizeRepositoryImpl implements PaymentGateway {

    async save(transaction: Transaction): Promise<void> {
        await TransactionModel.create({
            id: transaction.id.value,
            orderId: transaction.orderId.value,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        });
    }

    async find(id: string): Promise<Transaction> {
        const transactionModel = await TransactionModel.findOne({ where: { id } });
        if (!transactionModel) {
            throw new Error(`Transaction with id ${id} not found`);
        }

        return new Transaction({
            id: transactionModel.id,
            orderId: transactionModel.orderId,
            amount: transactionModel.amount,
            status: transactionModel.status,
            createdAt: transactionModel.createdAt,
            updatedAt: transactionModel.updatedAt
        });
    }

}