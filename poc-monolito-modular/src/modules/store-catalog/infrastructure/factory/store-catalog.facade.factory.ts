import StoreCatalogFacade from "../../facade/store-catalog.facade";
import StoreCatalogFacadeImpl from "../../facade/store-catalog.facade.impl";
import FindAllProductsUseCase from "../../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../../usecase/find-product/find-product.usecase";
import ProductSequelizeRepositoryImpl from "../persistence/sequelize/product.sequelize.repository.impl";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade {
        const repository = new ProductSequelizeRepositoryImpl();
        const findUseCase = new FindProductUseCase(repository);
        const findAllUseCase = new FindAllProductsUseCase(repository);
        const facade = new StoreCatalogFacadeImpl({
            findProductUseCase: findUseCase,
            findAllProductsUseCase: findAllUseCase
        });
        return facade;
    }
}