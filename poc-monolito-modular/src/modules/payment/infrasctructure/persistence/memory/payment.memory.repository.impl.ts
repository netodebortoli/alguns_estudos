import Transaction from "../../../domain/transaction";
import PaymentGateway from "../../../gateway/payment.gateway";

export default class PaymentMemoryRepositoryImpl implements PaymentGateway {

    constructor(private readonly transactions: Transaction[] = []) { }

    async save(transaction: Transaction): Promise<void> {
        this.transactions.push(transaction);
    }

    async find(id: string): Promise<Transaction> {
        const transaction = this.transactions.find(t => t.id.value === id);
        if (!transaction) {
            throw new Error(`Transaction with id ${id} not found.`);
        }
        return transaction;
    }
}