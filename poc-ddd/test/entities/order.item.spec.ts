import OrderItem from "../../src/entities/order_item"

describe('Order Item entity unit tests', () => {
    it('should create a order item', () => {
        const orderItem = new OrderItem('Item 2', 100.0)
        expect(orderItem).toBeDefined()
        expect(orderItem.name).toBe('Item 2')
        expect(orderItem.price).toBe(100.0)
    })

    it('should throw error when create ordem item without name', () => {
        expect(() => new OrderItem('', 10.0)).toThrow()
    })

    it('should throw error when create ordem item without price', () => {
        expect(() => new OrderItem('Item 1', -10)).toThrow()
    })

})