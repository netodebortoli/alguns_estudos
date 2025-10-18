import ProductFacadeImpl from "../../facade/product.facade.impl";
import AddProductUseCase from "../../usecase/add-product/add-product.usecase";
import ProductSequelizeRepositoryImpl from "../persistence/sequelize/product.sequelize.repository.impl";

export default class ProductFacadeFactory {

    static create() {
        const repository = new ProductSequelizeRepositoryImpl();
        const useCase = new AddProductUseCase(repository);
        const facade = new ProductFacadeImpl({
            addProductUseCase: useCase,
            checkStockUseCase: undefined
        });
        return facade;
    }
}