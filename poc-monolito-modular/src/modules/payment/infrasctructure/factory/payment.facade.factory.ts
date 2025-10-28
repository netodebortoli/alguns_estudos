import PaymentFacade from "../../facade/payment.facade";
import PaymentFacadeImpl from "../../facade/payment.facade.impl";
import PaymentGateway from "../../gateway/payment.gateway";
import ProcessPaymentUseCase from "../../usecase/process-payment/process-payment.usecase";
import PaymentSequelizeRepositoryImpl from "../persistence/sequelize/payment.sequelize.repository.impl";

export default class PaymentFacadeFactory {

    static create(repository?: PaymentGateway): PaymentFacade {
        const paymentRepository = repository || new PaymentSequelizeRepositoryImpl();
        const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository);
        return new PaymentFacadeImpl({
            processPaymentUseCase: processPaymentUseCase,
        })
    }
}