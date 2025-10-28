export default interface PaymentFacade {
    processTransaction(input: InputProcessTransactionDTO): Promise<OutputProcessTransactionDTO>;
}

export interface InputProcessTransactionDTO {
    orderId: string;
    amount: number;
}

export interface OutputProcessTransactionDTO {
    transactionId: string;
    orderId: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}