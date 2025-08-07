import Order from '../../src/entities/order';
import OrderItem from '../../src/entities/order_item';
import UUID from '../../src/vos/uuid';
import OrderService from '../../src/domain-services/order.service';

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
})