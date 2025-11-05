import Order from "../../../domain/order";
import CheckoutGateway from "../../../gateway/checkout.gateway";
import ClientModel from "./client.model";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

export default class OrderRepositorySequelizeImpl implements CheckoutGateway {

    async add(input: Order): Promise<void> {
        await ClientModel.create({
            id: input.client.id.value,
            name: input.client.name,
            email: input.client.email,
            street: input.client.address.street,
            city: input.client.address.city,
            state: input.client.address.state,
            createdAt: input.client.createdAt,
            updatedAt: input.client.updatedAt,
        });

        await OrderModel.create({
            id: input.id.value,
            clientId: input.client.id.value,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });

        await ProductModel.bulkCreate(
            input.products.map((product) => ({
                id: product.id.value,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                orderId: input.id.value,
            }))
        );
    }

    async find(orderId: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id: orderId },
            include: ["client", "products"],
            raw: false,
        });

        if (!orderModel) {
            throw new Error(`Order with ID ${orderId} not found`);
        }

        return new Order({
            id: orderModel.get().id,
            client: ClientModel.toDomain(orderModel.get().client),
            products: orderModel.get().products.map(ProductModel.toDomain),
            status: orderModel.get().status,
            createdAt: orderModel.get().createdAt,
            updatedAt: orderModel.get().updatedAt,
        });
    }

}