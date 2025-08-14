import Order from "../../domain/entities/order";
import OrderRepository from "../../domain/repositories/order.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import { Sequelize } from "sequelize-typescript";

export default class OrderRepositoryImpl implements OrderRepository {

    constructor(private sequelize?: Sequelize) {}

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.totalOrder,
            itens: entity.orderItens.map(OrderItemModel.toModel)
        },
            {
                include: [{ model: OrderItemModel }] // para incluir o objeto aninhado
            }
        )
    }

    async update(entity: Order): Promise<void> {
        // Primeiro atualiza o pedido principal
        await OrderModel.update({
            customerId: entity.customerId,
            total: entity.totalOrder,
        }, {
            where: { id: entity.id },
        });

        // Remove todos os itens existentes
        await OrderItemModel.destroy({
            where: { orderId: entity.id }
        });

        // Cria os novos itens
        await OrderItemModel.bulkCreate(
            entity.orderItens.map(item => ({
                id: item.id,
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                orderId: entity.id
            }))
        );
    }

    async findById(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({ where: { id }, include: ["itens"] });
        if (!orderModel) {
            throw new Error("Order not found");
        }
        return OrderModel.toDomain(orderModel);
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({include: ['itens']});
        return orders.map(OrderModel.toDomain);
    }

}