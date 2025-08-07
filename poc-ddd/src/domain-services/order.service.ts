import Order from "../entities/order";

// Os domain services são responsáveis por regras de negócio que envolvem múltiplas entidades ou agregados.
// Eles encapsulam a lógica que não pertence a uma única entidade, mas sim ao domínio como um todo.
// Eles devem ser stateless, ou seja, não devem manter estado entre as chamadas de método.
export default class OrderService {
    static getTotalAmount(orders: Order[]): number {
        if (!orders || orders.length === 0) throw new Error('Orders must be required to get total')
        return orders.reduce((acc, order) => order.totalOrder + acc, 0);
    }
}