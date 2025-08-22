import { Sequelize } from 'sequelize-typescript';
import UUID from '../../../src/domain/@shared/vo/uuid';
import Order from '../../../src/domain/checkout-module/entity/order';
import OrderItem from '../../../src/domain/checkout-module/entity/order_item';
import Customer from '../../../src/domain/customer-module/entity/customer';
import Address from '../../../src/domain/customer-module/vo/address';
import Product from '../../../src/domain/product-module/entity/product';
import OrderItemModel from '../../../src/infrastructure/checkout-module/repository/sequelize/order-item.model';
import OrderModel from '../../../src/infrastructure/checkout-module/repository/sequelize/order.model';
import OrderRepositoryImpl from '../../../src/infrastructure/checkout-module/repository/sequelize/order.repository.impl';
import CustomerModel from '../../../src/infrastructure/customer-module/repository/sequelize/customer.model';
import CustomerRepositoryImpl from '../../../src/infrastructure/customer-module/repository/sequelize/customer.repository.impl';
import ProductModel from '../../../src/infrastructure/product-module/repository/sequelize/product.model';
import ProductRepositoryImpl from '../../../src/infrastructure/product-module/repository/sequelize/product.repository.impl';

describe("Order repository integration test", () => {

    let sequelize: Sequelize;

    // Inicializa o sequelize a cada teste
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:', // Banco de dados em memória
            logging: false,
            sync: { force: true } // Sincroniza o modelo (os 'models') com o banco de dados.
        });
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
        await sequelize.sync();
    });

    // Fecha a conexão do sequelize a cada teste
    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a order', async () => {
        // given
        const customerRepository = new CustomerRepositoryImpl(sequelize);
        const address = new Address("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        const customer = new Customer("Aristides D. Neto", address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepositoryImpl(sequelize);
        const product = new Product('Product', 10);
        await productRepository.create(product);

        const orderRepository = new OrderRepositoryImpl(sequelize)
        const orderItem = new OrderItem(product.name, product.price, product.id, 1);
        const order = new Order(customer.id, [orderItem]);

        // when
        await orderRepository.create(order);
        const orderModel = await OrderModel.findOne(
            {
                where: { id: order.id },
                include: ["itens"]
            }
        );

        // then
        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.id,
            total: order.totalOrder,
            customerId: order.customerId,
            itens: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                productId: orderItem.productId,
                orderId: order.id
            }]
        });

    });

    it('should update order', async () => {
        // given
        const customerRepository = new CustomerRepositoryImpl(sequelize);
        const address = new Address("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        const customer = new Customer("Aristides D. Neto", address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepositoryImpl(sequelize);
        const product = new Product('Product 1', 10);
        await productRepository.create(product);

        const orderRepository = new OrderRepositoryImpl(sequelize)
        const orderItem = new OrderItem(product.name, product.price, product.id, 1);
        const order = new Order(customer.id, [orderItem]);

        await orderRepository.create(order);

        // when
        const newItem = new OrderItem('Product 2', 10, product.id, 2);
        order.addNewItem(newItem);
        await orderRepository.update(order);

        //then
        const result = await orderRepository.findById(order.id);

        expect(result?.orderItens).toHaveLength(2)
        expect(result.orderItens).toContainEqual(orderItem)
        expect(result.orderItens).toContainEqual(newItem)
        expect(result.totalOrder).toBe(30.0)
    })

    it('should find order by id', async () => {
        // given
        const customerRepository = new CustomerRepositoryImpl(sequelize);
        const address = new Address("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        const customer = new Customer("Aristides D. Neto", address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepositoryImpl(sequelize);
        const product = new Product('Product', 10);
        await productRepository.create(product);

        const orderRepository = new OrderRepositoryImpl(sequelize)
        const orderItem = new OrderItem(product.name, product.price, product.id, 1);
        const order = new Order(customer.id, [orderItem]);

        await orderRepository.create(order);

        // when
        const result = await orderRepository.findById(order.id);

        // then
        expect(result).toBeDefined()
        expect(result).toEqual(order)
    });

    it('should throw error when not find order', async () => {
        // given
        const orderRepository = new OrderRepositoryImpl(sequelize)
        const id = UUID.create().getValue();

        // when & then
        await expect(orderRepository.findById(id)).rejects.toThrow('Order not found')
    });

    it('should find all order', async () => {
        // given
        const customerRepository = new CustomerRepositoryImpl(sequelize);
        const address = new Address("Rua Belarmino Pinto", "374", "Baixo Guandu", "ES", "29730000");
        const customer = new Customer("Aristides D. Neto", address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepositoryImpl(sequelize);
        const product = new Product('Product', 10);
        await productRepository.create(product);

        const orderRepository = new OrderRepositoryImpl(sequelize)
        const orderItem1 = new OrderItem(product.name, product.price, product.id, 1);
        const orderItem2 = new OrderItem(product.name, product.price, product.id, 2);
        const order1 = new Order(customer.id, [orderItem1]);
        const order2 = new Order(customer.id, [orderItem2]);

        await orderRepository.create(order1);
        await orderRepository.create(order2);

        // when
        const result = await orderRepository.findAll();

        // then
        expect(result.length).toBe(2)
        expect(result).toContainEqual(order1)
        expect(result).toContainEqual(order2)
    });

})