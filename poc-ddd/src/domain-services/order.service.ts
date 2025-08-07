import Client from "../entities/client";
import Order from "../entities/order";
import OrderItem from "../entities/order_item";

// Os domain services são responsáveis por regras de negócio que envolvem múltiplas entidades ou agregados.
// Eles encapsulam a lógica que não pertence a uma única entidade, mas sim ao domínio como um todo.
// Eles devem ser stateless, ou seja, não devem manter estado entre as chamadas de método.
export default class OrderService {
    static getTotalAmount(orders: Order[]): number {
        if (!orders || orders.length === 0) throw new Error('Orders must be required to get total')
        return orders.reduce((acc, order) => order.totalOrder + acc, 0);
    }

    static placeOrder(client: Client, itens: OrderItem[]): Order {
        if (!client) throw new Error('Client must be required to place a new order');
        if (!itens || itens.length === 0) throw new Error('At lest one order item is required to place a new order');
        const newOrder = new Order(client.id, itens)
        client.updateRewardPoints(newOrder.totalOrder)
        return newOrder;
    }
}