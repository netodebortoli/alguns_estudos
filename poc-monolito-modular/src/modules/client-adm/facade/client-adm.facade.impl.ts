import UseCase from "../../@shared/domain/usecase/use-case";
import ClientAdmFacade, { InputAddClientDTO, InputFindClientDTO, OutputFindClientDTO } from "./client-adm.facade";

export interface UseCaseProps {
    findClientUseCase: UseCase;
    addClientUseCase: UseCase;
};

export default class ClientAdmFacadeImpl implements ClientAdmFacade {
    private _findClient: UseCase;
    private _addClient: UseCase;

    constructor(props: UseCaseProps) {
        this._findClient = props.findClientUseCase;
        this._addClient = props.addClientUseCase;
    }

    async addClient(input: InputAddClientDTO): Promise<void> {
        return await this._addClient.execute(input);
    }

    async findClient(input: InputFindClientDTO): Promise<OutputFindClientDTO> {
        return await this._findClient.execute(input);
    }
}