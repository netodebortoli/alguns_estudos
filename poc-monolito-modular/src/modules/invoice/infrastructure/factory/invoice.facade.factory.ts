import InvoiceFacade from "../../facade/invoice.facade";
import InvoiceFacadeImpl from "../../facade/invoice.facade.impl";
import InvoiceGateway from "../../gateway/invoice.gateway";
import FindInvoiceUseCase from "../../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceMemoryRepositoryImpl from "../persistence/memory/invoice.memory.repository.impl";

export default class InvoiceFacadeFactory {
    static create(repository?: InvoiceGateway): InvoiceFacade {
        const invoiceRepository = repository || new InvoiceMemoryRepositoryImpl();
        const findUseCase = new FindInvoiceUseCase(invoiceRepository);
        const generateUseCase = new GenerateInvoiceUseCase(invoiceRepository);

        return new InvoiceFacadeImpl({
            findInvoiceUseCase: findUseCase,
            generateInvoiceUseCase: generateUseCase,
        });
    }
}