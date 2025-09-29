import UUID from "../../../src/domain/@shared/vo/uuid"
import OrderItem from "../../../src/domain/checkout-module/entity/order_item"

describe('Order Item entity unit tests', () => {
    it('should create a order item', () => {
        const id = UUID.create().getValue();
        const orderItem = new OrderItem('Item 2', 100.0, id, 1)
        expect(orderItem).toBeDefined()
        expect(orderItem.name).toBe('Item 2')
        expect(orderItem.price).toBe(100.0)
    })

    it('should throw error when create ordem item without name', () => {
        const id = UUID.create().getValue();
        expect(() => new OrderItem('', 10.0, id , 1)).toThrow("Invalid name");
    })

    it('should throw error when create ordem item without price', () => {
        const id = UUID.create().getValue();
        expect(() => new OrderItem('Item 1', -1, id, 1)).toThrow("Price value must be greater or equal zero");
    })

    it('should throw error when create ordem item without quantity', () => {
        const id = UUID.create().getValue();
        expect(() => new OrderItem('Item 1', 10.0, id, 0)).toThrow("Quantity must be greater than zero");
    })

    it('should throw error when create ordem item without productId', () => {
        const id = UUID.create().getValue();
        expect(() => new OrderItem('Item 1', 10.0, '', 1)).toThrow("Invalid UUID");
    })

    it('should calculate total price', () => {
        const id = UUID.create().getValue();
        const orderItem = new OrderItem('Item', 100.0, id, 2)
        expect(orderItem).toBeDefined()
        expect(orderItem.name).toBe('Item')
        expect(orderItem.price).toBe(100.0)
        expect(orderItem.quantity).toBe(2)
        expect(orderItem.totalPrice).toBe(200.0)
    })

})