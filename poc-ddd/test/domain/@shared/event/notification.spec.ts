import NotificationError from '../../../../src/domain/@shared/notification/notification';

describe('Notification pattern unit tests', () => {

    it('should add a error', () => {
        const notification = new NotificationError();

        notification.addError({ context: 'customer', message: 'Email is required' })

        const result = notification.getMessages();
        
        expect(result).toBe('customer: Email is required')
    });

    it('should add errors', () => {
        const notification = new NotificationError();

        notification.addErros([
            { context: 'customer', message: 'Name is required' },
            { context: 'customer', message: 'Id is required' }
        ])

        expect(notification.getMessages())
            .toBe('customer: Name is required, customer: Id is required')

        notification.addError({ context: 'customer', message: 'Email is required' })

        expect(notification.getMessages())
            .toBe('customer: Name is required, customer: Id is required, customer: Email is required')
    });

    it('should get message from a specifcs contexts', () => {
        const notification = new NotificationError();       
    
        notification.addErros([
            { context: 'customer', message: 'Name is required' },
            { context: 'customer', message: 'Id is required' },
            { context: 'product', message: 'Price value must be greater or equal zero' }
        ])

        const productErros = notification.getMessages('product')

        expect(productErros).toBe('product: Price value must be greater or equal zero')

        const customerErros = notification.getMessages('customer')

        expect(customerErros)
            .toBe('customer: Name is required, customer: Id is required')
    });

    it('should verify if context has errors', () => {
        const notification = new NotificationError();       
    
        notification.addErros([
            { context: 'customer', message: 'Name is required' },
            { context: 'customer', message: 'Id is required' },
            { context: 'product', message: 'Price value must be greater or equal zero' }
        ])

        expect(notification.hasErrors('customer')).toBeTruthy()
        expect(notification.hasErrors('product')).toBeTruthy()
    });

});