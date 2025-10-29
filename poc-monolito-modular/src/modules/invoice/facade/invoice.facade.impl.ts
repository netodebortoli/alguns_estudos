import UseCase from "../../@shared/domain/usecase/use-case";
import InvoiceFacade, { InputFindInvoiceDTO, InputGenerateInvoiceDTO, OutputFindInvoiceDTO, OutputGenerateInvoiceDTO } from "./invoice.facade";

export interface UseCaseProps {
    generateInvoiceUseCase: UseCase;
    findInvoiceUseCase: UseCase;
}

export default class InvoiceFacadeImpl implements InvoiceFacade {

    private _generateInvoice: UseCase;
    private _findInvoice: UseCase;

    constructor(useCases: UseCaseProps) {
        this._generateInvoice = useCases.generateInvoiceUseCase;
        this._findInvoice = useCases.findInvoiceUseCase;
    }

    async generate(input: InputGenerateInvoiceDTO): Promise<OutputGenerateInvoiceDTO> {
        return await this._generateInvoice.execute(input);
    }

    async find(input: InputFindInvoiceDTO): Promise<OutputFindInvoiceDTO> {
        return await this._findInvoice.execute(input);
    }
}