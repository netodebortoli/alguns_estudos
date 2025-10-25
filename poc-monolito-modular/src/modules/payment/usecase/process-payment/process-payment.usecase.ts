import UseCase from "../../../@shared/domain/usecase/use-case";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";

export default class ProcessPaymentUseCase implements UseCase {

    constructor(private readonly transactionRepository: PaymentGateway) {
    }

    async execute(input: Input): Promise<Output> {
        const transaction = new Transaction({
            id: input.id,
            amount: input.amount,
            orderId: input.orderId,
        })

        transaction.processTransaction();

        await this.transactionRepository.save(transaction);

        return {
            transactionId: transaction.id.value,
            orderId: transaction.orderId.value,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        }
    }
}

type Input = {
    id?: string;
    amount: number;
    orderId: string;
}

type Output = {
    transactionId: string;
    orderId: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}