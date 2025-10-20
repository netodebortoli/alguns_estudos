import { Sequelize } from "sequelize-typescript";
import ProductFacadeFactory from "../infrastructure/factory/product.facade.factory";
import ProductModel from "../infrastructure/persistence/sequelize/product.model";

describe("Product facade impl test", () => {

    const facade = ProductFacadeFactory.create();
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

    it("should find product stock number", async () => {
        const inputAddProduct = {
            name: "Product",
            description: "Description",
            purchasePrice: 100,
            stock: 999
        };

        const outputFacade = await facade.addProduct(inputAddProduct);

        // given
        const input = { productId: outputFacade.id };

        // when
        const checkStock = await facade.checkStock(input);

        // then
        expect(checkStock.productId).toBe(outputFacade.id);
        expect(checkStock.stock).toBe(999);
    });

})