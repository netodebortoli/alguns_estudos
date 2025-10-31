import Order from "../domain/order";

export default interface CheckoutGateway {
    add(input: Order): Promise<void>;
    find(orderId: string): Promise<Order | null>;
}