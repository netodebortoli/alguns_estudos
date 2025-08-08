import OrderItem from "../../../src/domain/entities/order_item"
import Order from "../../../src/domain/entities/order"
import Product from "../../../src/domain/entities/product"
import Customer from "../../../src/domain/entities/customer"

describe('Order entity unit tests', () => {
    it('should create a order', () => {
        const product = new Product('Produto 1', 100.0)
        const customer = new Customer('John Doe')
        const orderItems = [
            new OrderItem('Item 1', 50.0, product.id, 2),
            new OrderItem('Item 2', 100.0, product.id, 2)
        ]
        
        const order = new Order(customer.id, orderItems)
        
        expect(order).toBeDefined()
        expect(order.id).toBeDefined()
        expect(order.customerId).toBeDefined()
        expect(order.customerId).toBe(customer.id)
        expect(order.totalOrder).toBeDefined()
        expect(order.totalOrder).toBe(300.0)
    })

    it('should append itens a order', () => {
        const customer = new Customer('John Doe')
        const product = new Product('Produto 1', 100.0)
        const orderItems = [new OrderItem('Item 1', 100.0, product.id, 1)]
        
        const order = new Order(customer.id, orderItems)
        order.addNewItem(new OrderItem('Item 2', 50.0, product.id, 2))
        
        expect(order.totalOrder).toBe(200.0)
        expect(order.orderItens.length).toBe(2)
    })

    it('should throw error when add a invalid item in order', () => {
        const customer = new Customer('John Doe')
        const product = new Product('Produto 1', 100.0)
        const orderItems = [new OrderItem('Item 1', 100.0, product.id, 1)]
        const order = new Order(customer.id, orderItems)
        const invalidItem: OrderItem | undefined = undefined;
        expect(() => order.addNewItem(invalidItem)).toThrow()
    })

    it('should throw error when create a order with invalid customerId', () => {
        const product = new Product('Produto 1', 100.0)
        const orderItems = [
            new OrderItem('Item 1', 100.0, product.id, 1),
            new OrderItem('Item 2', 100.0, product.id, 2)
        ]
        expect(() => new Order('', orderItems)).toThrow()        
    })

    it('should throw error when create a order with invalid itens', () => {
        const orderItems = []
        const customer = new Customer('John Doe')
        expect(() => new Order(customer.id, orderItems)).toThrow()        
    })
})