import { Sequelize } from 'sequelize-typescript';
import Product from '../../../src/domain/entities/product';
import UUID from '../../../src/domain/vos/uuid';
import ProductModel from '../../../src/infrastructure/db/sequelize/model/product.model';
import ProductRepositoryImpl from '../../../src/infrastructure/repository/product.repository.impl';

describe("Product repository integration test", () => {

    let sequelize: Sequelize;

    // Inicializa o sequelize a cada teste
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:', // Banco de dados em memória
            logging: false,
            sync: { force: true } // Sincroniza o modelo (os 'models') com o banco de dados.
        });
        sequelize.addModels([ProductModel])
        await sequelize.sync();
    });

    // Fecha a conexão do sequelize a cada teste
    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        // given
        const productRepository = new ProductRepositoryImpl();
        const product = new Product('Product', 100);

        // when
        await productRepository.create(product);

        // then
        const productModel = await ProductModel.findOne({ where: { id: product.id } });
        expect(productModel).toBeDefined();
        expect(productModel?.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });

    it('should update a product', async () => {
        // given
        const productRepository = new ProductRepositoryImpl();
        const product = new Product('Product', 100);
        await productRepository.create(product);

        // when
        product.changeName('Updated Product');
        product.changePrice(200);
        await productRepository.update(product);

        // then
        const productModel = await ProductModel.findOne({ where: { id: product.id } });
        expect(productModel).toBeDefined();
        expect(productModel?.toJSON()).toStrictEqual({
            id: product.id,
            name: 'Updated Product',
            price: 200
        });
    });

    it('should find product by id', async () => {
        // given
        const productRepository = new ProductRepositoryImpl();
        const product = new Product('Product', 100);
        await productRepository.create(product);

        // when
        const foundProduct = await productRepository.findById(product.id)

        expect(foundProduct).toBeDefined()
        expect(foundProduct).toStrictEqual(product)
    });

    it('should throw error when not find product by id', async () => {
        // given
        const productRepository = new ProductRepositoryImpl();
        const nonExistentId = UUID.create().getValue();

        // when & then
        await expect(productRepository.findById(nonExistentId)).rejects.toThrow('Product not found');
    });

    it('should find all products', async () => {
        // given
        const productRepository = new ProductRepositoryImpl();
        const product1 = new Product('Product 1', 100);
        const product2 = new Product('Product 2', 200);
        const product3 = new Product('Product 3', 300);

        await productRepository.create(product1);
        await productRepository.create(product2);
        await productRepository.create(product3);

        // when
        const result = await productRepository.findAll();

        // then
        expect(result).toBeDefined()
        expect(result.length).toBe(3)
        expect(result[0].id).toBe(product1.id)
        expect(result[1].id).toBe(product2.id)
        expect(result[2].id).toBe(product3.id)
    });

})