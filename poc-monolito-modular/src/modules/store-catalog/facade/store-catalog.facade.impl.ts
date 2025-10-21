import UseCase from "../../@shared/domain/use-case/use-case";
import StoreCatalogFacade, { InputFindProductDTO, OutputFindAllProductsDTO, OutputFindProductDTO } from "./store-catalog.facade";

export interface UseCaseProps {
    findProductUseCase: UseCase;
    findAllProductsUseCase: UseCase;
}

export default class StoreCatalogFacadeImpl implements StoreCatalogFacade {

    private _findProductUseCase: UseCase;
    private _findAllProductsUseCase: UseCase;

    constructor(props: UseCaseProps) {
        this._findProductUseCase = props.findProductUseCase;
        this._findAllProductsUseCase = props.findAllProductsUseCase;
    }

    async find(id: InputFindProductDTO): Promise<OutputFindProductDTO> {
        return await this._findProductUseCase.execute(id);
    }

    async findAll(): Promise<OutputFindAllProductsDTO> {
        return await this._findAllProductsUseCase.execute({});
    }

}