import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product";
import ProductModel from "./product.model";
import ProductSequelizeRepositoryImpl from "./product.sequelize.repository.impl";
import { v4 as uuid4 } from 'uuid';

describe('Product sequelize repository integration tests', () => {

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
        const repository = new ProductSequelizeRepositoryImpl();

        const productId = uuid4();

        await ProductModel.create({
            id: productId,
            name: 'Product 1',
            description: 'Description 1',
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()

        })

        const productFound = await repository.find(productId);

        expect(productFound).toBeDefined();
        expect(productFound.id.value).toBe(productId);
        expect(productFound.name).toBe('Product 1');
        expect(productFound.description).toBe('Description 1');
        expect(productFound.purchasePrice).toBe(100);
        expect(productFound.stock).toBe(10);
        expect(productFound.createdAt).toStrictEqual(expect.any(Date));
        expect(productFound.updatedAt).toStrictEqual(expect.any(Date));
    });

    it('should throw error when not find a product by id', async () => {
        const repository = new ProductSequelizeRepositoryImpl();
        await expect(() => repository.find('999')).rejects.toThrow("Product with id 999 not found");
    });

});