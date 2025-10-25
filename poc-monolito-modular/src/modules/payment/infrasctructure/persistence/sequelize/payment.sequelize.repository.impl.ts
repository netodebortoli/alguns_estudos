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

}