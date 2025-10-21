import { Sequelize } from "sequelize-typescript";
import ProductModel from "../infrastructure/persistence/sequelize/product.model";
import StoreCatalogFacadeFactory from "../infrastructure/factory/store-catalog.facade.factory";
import { v4 as uuidv4 } from 'uuid';

describe("Store catalog facade integration tests", () => {

    const facade = StoreCatalogFacadeFactory.create();
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

    it('should find all products', async () => {
        // given
        const product1Id = uuidv4();
        await ProductModel.create({
            id: product1Id,
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100
        });

        const product2Id = uuidv4();
        await ProductModel.create({
            id: product2Id,
            name: "Product 2",
            description: "Description 2",
            salesPrice: 200
        });

        // when
        const result = await facade.findAll();

        // then
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product1Id);
        expect(result.products[0].name).toBe("Product 1");
        expect(result.products[0].description).toBe("Description 1");
        expect(result.products[0].salesPrice).toBe(100);
        expect(result.products[1].id).toBe(product2Id);
        expect(result.products[1].name).toBe("Product 2");
        expect(result.products[1].description).toBe("Description 2");
        expect(result.products[1].salesPrice).toBe(200);
    });

    it('should find a product by id', async () => {
        const productId = uuidv4();
        await ProductModel.create({
            id: productId,
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100
        });

        // given
        const input = { productId: productId };

        // when
        const result = await facade.find(input);

        // then
        expect(result.id).toBe(productId);
        expect(result.name).toBe("Product 1");
        expect(result.description).toBe("Description 1");
        expect(result.salesPrice).toBe(100);
    });

    it('should throw error when find non-existings product', async () => {
        // given
        const input = { productId: '11223344' };

        // when & then
        await expect(facade.find(input)).rejects.toThrow("Product with id 11223344 not found");
    });

});