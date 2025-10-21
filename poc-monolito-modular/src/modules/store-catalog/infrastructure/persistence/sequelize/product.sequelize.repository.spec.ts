import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductSequelizeRepositoryImpl from "./product.sequelize.repository.impl";
import { v4 as uuidv4 } from 'uuid';

describe('ProductSequelizeRepository integration tests', () => {

    const repository = new ProductSequelizeRepositoryImpl();
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        // Adicionar modelos ao Sequelize
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find all products', async () => {
        // given
        const productId1 = uuidv4();
        const productId2 = uuidv4();
        await ProductModel.create({
            id: productId1,
            name: 'Product 1',
            description: 'Description 1',
            salesPrice: 100
        });

        await ProductModel.create({
            id: productId2,
            name: 'Product 2',
            description: 'Description 2',
            salesPrice: 200
        });

        // when
        const products = await repository.findAll();

        // then
        expect(products.length).toBe(2);
        expect(products[0].id.value).toBe(productId1);
        expect(products[0].name).toBe('Product 1');
        expect(products[0].description).toBe('Description 1');
        expect(products[0].salesPrice).toBe(100);
        expect(products[1].id.value).toBe(productId2);
        expect(products[1].name).toBe('Product 2');
        expect(products[1].description).toBe('Description 2');
        expect(products[1].salesPrice).toBe(200);
    })

    it('should find product by id', async () => {
        // given
        const productId1 = uuidv4();
        await ProductModel.create({
            id: productId1,
            name: 'Product 1',
            description: 'Description 1',
            salesPrice: 100
        });

        // when
        const product = await repository.find(productId1);

        // then
        expect(product.id.value).toBe(productId1);
        expect(product.name).toBe('Product 1');
        expect(product.description).toBe('Description 1');
        expect(product.salesPrice).toBe(100);
    })

    it('should throw error when find product by id', async () => {
        // given
        const productId = uuidv4();

        // when & then
        await expect(repository.find(productId)).rejects.toThrow(`Product with id ${productId} not found`);
    })

});