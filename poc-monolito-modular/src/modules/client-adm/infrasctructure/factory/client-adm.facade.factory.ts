import ClientAdmFacade from "../../facade/client-adm.facade";
import ClientAdmFacadeImpl from "../../facade/client-adm.facade.impl";
import AddClientUseCase from "../../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../../usecase/find-client/find-client.usecase";
import ClientSequelizeRepositoryImpl from "../persistence/sequelize/client.sequelize.repository.impl";

export default class ClientFacadeFactory {
    static create(): ClientAdmFacade {
        const repository = new ClientSequelizeRepositoryImpl();
        const findClientUseCase = new FindClientUseCase(repository);
        const addClientUseCase = new AddClientUseCase(repository);
        return new ClientAdmFacadeImpl({
            findClientUseCase: findClientUseCase,
            addClientUseCase: addClientUseCase
        });
    }
}