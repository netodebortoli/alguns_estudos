import OrderItem from "./../../src/entities/order_item"
import Order from "./../../src/entities/order"
import Client from "./../../src/entities/client"

describe('Order entity unit tests', () => {
    it('should create a order', () => {
        const customer = new Client('John Doe')
        const orderItems = [
            new OrderItem('Item 1', 100.0),
            new OrderItem('Item 2', 100.0)
        ]
        
        const order = new Order(customer.id, orderItems)
        
        expect(order).toBeDefined()
        expect(order.id).toBeDefined()
        expect(order.customerId).toBeDefined()
        expect(order.customerId).toBe(customer.id)
        expect(order.totalOrder).toBeDefined()
        expect(order.totalOrder).toBe(200.0)
    })

    it('should append itens a order', () => {
        const customer = new Client('John Doe')
        const orderItems = [new OrderItem('Item 1', 100.0)]
        const order = new Order(customer.id, orderItems)

        order.addNewItem(new OrderItem('Item 2', 100.0))
        
        expect(order.totalOrder).toBe(200.0)
        expect(order.orderItens.length).toBe(2)
    })

    it('should throw error when add a invalid item in order', () => {
        const customer = new Client('John Doe')
        const orderItems = [new OrderItem('Item 1', 100.0)]
        const order = new Order(customer.id, orderItems)
        const invalidItem: OrderItem | undefined = undefined;
        expect(() => order.addNewItem(invalidItem)).toThrow()
    })

    it('should throw error when create a order with invalid customerId', () => {
        const orderItems = [
            new OrderItem('Item 1', 100.0),
            new OrderItem('Item 2', 100.0)
        ]
        expect(() => new Order('', orderItems)).toThrow()        
    })

    it('should throw error when create a order with invalid itens', () => {
        const orderItems = []
        const customer = new Client('John Doe')
        expect(() => new Order(customer.id, orderItems)).toThrow()        
    })
})