import { Sequelize } from "sequelize-typescript";
import Client from "../../../domain/client";
import Order from "../../../domain/order";
import Product from "../../../domain/product";
import ClientModel from "./client.model";
import OrderModel from "./order.model";
import OrderRepositorySequelizeImpl from "./order.sequelize.repository.impl";
import ProductModel from "./product.model";

describe('Order sequelize integration tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([OrderModel, ClientModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create an order', async () => {
        const repository = new OrderRepositorySequelizeImpl();

        const products =
            [
                new Product({
                    name: "Product 1",
                    description: "Description 1",
                    salesPrice: 100
                }),
                new Product({
                    name: "Product 2",
                    description: "Description 2",
                    salesPrice: 200
                }),
            ]
        const client = new Client({
            name: "John Doe",
            email: "john@email.com",
            street: "123 Main St",
            city: "Anytown",
            state: "CA"
        });
        const order = new Order({
            client: client,
            products: products
        })

        // when
        await repository.add(order);

        // then
        const orderModel = await OrderModel.findOne({
            where: { id: order.id.value },
            include: ["client", "products"],
            raw: false,
        });

        expect(orderModel).toBeDefined();
        expect(orderModel!.get().id).toBe(order.id.value);
        expect(orderModel!.get().client.get().id).toBe(client.id.value);
        expect(orderModel!.get().client.get().name).toBe(client.name);
        expect(orderModel!.get().client.get().email).toBe(client.email);
        expect(orderModel!.get().client.get().street).toBe(client.address.street);
        expect(orderModel!.get().client.get().city).toBe(client.address.city);
        expect(orderModel!.get().client.get().state).toBe(client.address.state);
        expect(orderModel!.get().client.get().createdAt).toBeDefined();
        expect(orderModel!.get().client.get().createdAt).toStrictEqual(client.createdAt);
        expect(orderModel!.get().client.get().updatedAt).toBeDefined();
        expect(orderModel!.get().client.get().updatedAt).toStrictEqual(client.updatedAt);
        expect(orderModel!.get().status).toBe("pending");

        expect(orderModel!.get().products.length).toBe(2);

        expect(orderModel!.get().products[0].get().id).toBe(products[0].id.value);
        expect(orderModel!.get().products[0].get().name).toBe(products[0].name);
        expect(orderModel!.get().products[0].get().description).toBe(products[0].description);
        expect(orderModel!.get().products[0].get().salesPrice).toBe(products[0].salesPrice);
        expect(orderModel!.get().products[0].get().createdAt).toBeDefined();
        expect(orderModel!.get().products[0].get().updatedAt).toBeDefined();

        expect(orderModel!.get().products[1].get().id).toBe(products[1].id.value);
        expect(orderModel!.get().products[1].get().name).toBe(products[1].name);
        expect(orderModel!.get().products[1].get().description).toBe(products[1].description);
        expect(orderModel!.get().products[1].get().salesPrice).toBe(products[1].salesPrice);
        expect(orderModel!.get().products[1].get().createdAt).toBeDefined();
        expect(orderModel!.get().products[1].get().updatedAt).toBeDefined();
    });

});