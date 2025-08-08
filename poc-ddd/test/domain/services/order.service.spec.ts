import Customer from "../../../src/domain/entities/customer";
import Order from "../../../src/domain/entities/order";
import OrderItem from "../../../src/domain/entities/order_item";
import OrderService from "../../../src/domain/services/order.service";
import UUID from "../../../src/domain/vos/uuid";

describe('Order domain service unit tests', () => {
    it('should get total amount froms orders', () => {
        const productId = UUID.create().getValue();
        const clientId = UUID.create().getValue();

        const order1 = new Order(clientId, [
            new OrderItem('Item 1', 50, productId, 2),
            new OrderItem('Item 2', 100, productId, 2),
        ]);

        const order2 = new Order(clientId, [
            new OrderItem('Item 3', 100, productId, 2),
        ]);

        const total = OrderService.getTotalAmount([order1, order2]);

        expect(total).toBe(500);
    });

    it('should throw error when orders is empty', () => {
        expect(() => OrderService.getTotalAmount([]))
            .toThrow('Orders must be required to get total');
    });

    it('should place a new order and defined rewards points of client', () => {
        const productId = UUID.create().getValue();
        const client = new Customer('John Doe');
        const itens = [
            new OrderItem('Item 1', 10, productId, 1),
            new OrderItem('Item 2', 20, productId, 1),
        ]

        const order = OrderService.placeOrder(client, itens);

        expect(order).toBeDefined()
        expect(order.totalOrder).toBe(30)
        expect(order.customerId).toBe(client.id)
        expect(order.orderItens.length).toBe(itens.length)
        expect(client.rewardPoints).toBe(15)
    })
})