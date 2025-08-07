import Order from "../entities/order";

export default class OrderService {
    static getTotalAmount(orders: Order[]): number {
        if (!orders || orders.length === 0) throw new Error('Orders must be required to get total')
        return orders.reduce((acc, order) => order.totalOrder + acc, 0);
    }
}