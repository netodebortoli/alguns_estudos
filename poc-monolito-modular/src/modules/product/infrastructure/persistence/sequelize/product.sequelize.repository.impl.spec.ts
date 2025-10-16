import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product";
import ProductModel from "./product.model";
import ProductSequelizeRepositoryImpl from "./product.sequelize.repository.impl";

describe('Product Sequelize Repository tests', () => {

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

    it('should create a product', async () => {
        const repository = new ProductSequelizeRepositoryImpl();

        const product = new Product({
            name: 'Product 1',
            description: 'Description 1',
            purchasePrice: 100,
            stock: 10
        });

        await repository.add(product);

        const productDb = await ProductModel.findOne({
            where: { id: product.id.value },
        });

        expect(productDb.get()).toBeDefined();
        expect(productDb.get().id).toBeDefined();
        expect(productDb.get().id).toBe(product.id.value);
        expect(productDb.get().name).toBe(product.name);
        expect(productDb.get().description).toBe(product.description);
        expect(productDb.get().purchasePrice).toBe(product.purchasePrice);
        expect(productDb.get().stock).toBe(product.stock);
        expect(productDb.get().createdAt).toStrictEqual(product.createdAt);
        expect(productDb.get().updatedAt).toStrictEqual(product.updatedAt);
    });

    it('should find a product by id', async () => {
        // Test implementation
    });

});