import ProductFacade from "../../facade/product.facade";
import ProductFacadeImpl from "../../facade/product.facade.impl";
import AddProductUseCase from "../../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../../usecase/check-stock/check-stock.usecase";
import ProductSequelizeRepositoryImpl from "../persistence/sequelize/product.sequelize.repository.impl";

export default class ProductFacadeFactory {

    static create(): ProductFacade {
        const repository = new ProductSequelizeRepositoryImpl();
        const checkStockUseCase = new CheckStockUseCase(repository);
        const addProductUseCase = new AddProductUseCase(repository);
        const facade = new ProductFacadeImpl({
            addProductUseCase: addProductUseCase,
            checkStockUseCase: checkStockUseCase
        });
        return facade;
    }
}