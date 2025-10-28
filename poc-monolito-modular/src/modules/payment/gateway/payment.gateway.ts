import Transaction from "../domain/transaction";

export default interface PaymentGateway {
    save(transaction: Transaction): Promise<void>;
    find(id: string): Promise<Transaction>;
}