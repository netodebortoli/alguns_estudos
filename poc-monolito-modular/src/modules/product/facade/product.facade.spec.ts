import { Sequelize } from "sequelize-typescript";
import ProductModel from "../infrastructure/persistence/sequelize/product.model";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductSequelizeRepositoryImpl from "../infrastructure/persistence/sequelize/product.sequelize.repository.impl";
import ProductFacadeImpl from "./product.facade.impl";

describe("Product facade impl test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const repository = new ProductSequelizeRepositoryImpl();
        const useCase = new AddProductUseCase(repository);
        const facade = new ProductFacadeImpl({ addProductUseCase: useCase, checkStockUseCase: undefined });

        // given
        const inputAddProduct = {
            name: "Product",
            description: "Description",
            purchasePrice: 100,
            stock: 10
        };

        // when
        const outputFacade = await facade.addProduct(inputAddProduct);

        // then
        const productDb = await ProductModel.findOne({ where: { id: outputFacade.id } });        

        expect(productDb.get()).toBeDefined();
        expect(productDb.get().id).toBe(outputFacade.id);
        expect(productDb.get().name).toBe(outputFacade.name);
        expect(productDb.get().description).toBe(outputFacade.description);
        expect(productDb.get().purchasePrice).toBe(outputFacade.purchasePrice);
        expect(productDb.get().stock).toBe(outputFacade.stock);
        expect(productDb.get().createdAt).toStrictEqual(outputFacade.createdAt);
        expect(productDb.get().updatedAt).toStrictEqual(outputFacade.updatedAt);
    });

})