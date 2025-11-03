import UseCase from "../../@shared/domain/usecase/use-case";
import PaymentFacade, { InputProcessTransactionDTO, OutputProcessTransactionDTO } from "./payment.facade";

export interface UseCaseProps {
    processPaymentUseCase: UseCase;
}

export default class PaymentFacadeImpl implements PaymentFacade {
    private _processPaymentUseCase: UseCase;

    constructor(props: UseCaseProps) {
        this._processPaymentUseCase = props.processPaymentUseCase;
    }

    async processTransaction(input: InputProcessTransactionDTO): Promise<OutputProcessTransactionDTO> {
        return await this._processPaymentUseCase.execute(input);
    }

}