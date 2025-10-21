import UseCase from "../../@shared/domain/usecase/use-case";
import ProductFacade, { InputAddProductDTO, InputCheckStockDTO, OutputCheckStockDTO } from "./product.facade";

export interface UseCaseProps {
    addProductUseCase: UseCase;
    checkStockUseCase: UseCase;
}

export default class ProductFacadeImpl implements ProductFacade {
    private _addProductUseCase: UseCase;
    private _checkStockUseCase: UseCase;

    constructor(props: UseCaseProps) {
        this._addProductUseCase = props.addProductUseCase;
        this._checkStockUseCase = props.checkStockUseCase;
    }

    async addProduct(input: InputAddProductDTO): Promise<any> {
        // os atributos de input do dto do facade é igual aos atributos do dto de input do usecase então nao precisa mapear
        return await this._addProductUseCase.execute(input);
    }

    async checkStock(input: InputCheckStockDTO): Promise<OutputCheckStockDTO> {
        return await this._checkStockUseCase.execute(input);
    }

}