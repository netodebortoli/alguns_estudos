import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/order_item";

// Os domain services são responsáveis por regras de negócio que envolvem múltiplas entidades ou agregados.
// Eles encapsulam a lógica que não pertence a uma única entidade, mas sim ao domínio como um todo.
// Eles devem ser stateless, ou seja, não devem manter estado entre as chamadas de método.
export default class OrderService {
    
    private static PERCENTAGE_REWARDS_POINTS = 0.5;

    static getTotalAmount(orders: Order[]): number {
        if (!orders || orders.length === 0) throw new Error('Orders must be required to get total')
        return orders.reduce((acc, order) => order.totalOrder + acc, 0);
    }

    static placeOrder(customer: Customer, itens: OrderItem[]): Order {
        if (!customer) throw new Error('Client must be required to place a new order');
        if (!itens || itens.length === 0) throw new Error('At lest one order item is required to place a new order');
        const newOrder = new Order(customer.id, itens)
        // 50% do custo total de um pedido é convertido em pontos de fidelidade
        customer.addRewardPoints(newOrder.totalOrder * this.PERCENTAGE_REWARDS_POINTS)
        return newOrder;
    }
}