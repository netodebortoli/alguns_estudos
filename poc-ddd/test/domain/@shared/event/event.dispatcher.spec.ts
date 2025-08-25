import EventDispatcherImpl from '../../../../src/domain/@shared/event/event.dispatcher.impl';
import UUID from '../../../../src/domain/@shared/vo/uuid';
import CustomerChangedAddressEvent from '../../../../src/domain/customer-module/event/customer-changed-address.event';
import CustomerCreatedEvent from '../../../../src/domain/customer-module/event/customer-created.event';
import EnviaConsoleLog1Handler from '../../../../src/domain/customer-module/event/handlers/created-customer-1.handler';
import EnviaConsoleLog2Handler from '../../../../src/domain/customer-module/event/handlers/created-customer-2.handler';
import CustomerChangedAddresHandler from '../../../../src/domain/customer-module/event/handlers/customer-changed-address.handler';
import SendEmailWhenProductCreatedHandler from '../../../../src/domain/product-module/event/handlers/send-email-product-created.handler';
import ProductCreatedEvent from '../../../../src/domain/product-module/event/product-created.event';

describe("Event Dispatcher tests unit", () => {

    let eventDispatcher: EventDispatcherImpl;

    beforeEach(() => {
        eventDispatcher = new EventDispatcherImpl();
    });

    it('should notify handlers with product created', () => {
        // given
        const handler1 = new SendEmailWhenProductCreatedHandler();
        const spy1 = jest.spyOn(handler1, 'handle')
        eventDispatcher.register('ProductCreatedEvent', handler1);
        
        // when
        const productCreatedEvent = new ProductCreatedEvent({
            productName: 'Product',
            price: 10.0
        })
        eventDispatcher.notify(productCreatedEvent);
        
        // then
        expect(spy1).toHaveBeenCalled()
        expect(spy1).toHaveBeenCalledTimes(1)

        // Segundo cenario - adicionando mais um handler
        const handler2 = new SendEmailWhenProductCreatedHandler();
        const spy2 = jest.spyOn(handler2, 'handle')
        eventDispatcher.register('ProductCreatedEvent', handler2);

        // when
        eventDispatcher.notify(productCreatedEvent);

        // then
        expect(spy1).toHaveBeenCalledTimes(2) // handler1 foi chamado pela segunda vez
        expect(spy2).toHaveBeenCalledTimes(1) // handler2 foi chamado a primeira vez
    })

    it('should notify handlers with customer created', () => {
        // given
        const handler1 = new EnviaConsoleLog1Handler();
        const handler2 = new EnviaConsoleLog2Handler();
        const spy1 = jest.spyOn(handler1, 'handle')
        const spy2 = jest.spyOn(handler2, 'handle')
        eventDispatcher.register('CustomerCreatedEvent', handler1);
        eventDispatcher.register('CustomerCreatedEvent', handler2);

        // when
        const customerCreatedEvent = new CustomerCreatedEvent({
            name: 'Aristides D. Neto',
            addrress: {
                street: "Rua Belarmino Pinto",
                number: "374",
                city: "Baixo Guandu",
                state: "ES",
                zipCode: "29730000"
            }
        })
        eventDispatcher.notify(customerCreatedEvent);

        // then
        expect(spy1).toHaveBeenCalled()
        expect(spy1).toHaveBeenCalledTimes(1)
        expect(spy2).toHaveBeenCalled()
        expect(spy2).toHaveBeenCalledTimes(1)
    })

    it('should notify handlers when customer has changed your address', () => {
        // given
        const handler = new CustomerChangedAddresHandler();
        const spy1 = jest.spyOn(handler, 'handle')
        eventDispatcher.register('CustomerChangedAddressEvent', handler);

        // when
        const customerChangeAddressEvent = new CustomerChangedAddressEvent({
            id: UUID.create(),
            name: 'Aristides D. Neto',
            address: {
                street: "Rua Belarmino Pinto",
                number: "374",
                city: "Baixo Guandu",
                state: "ES",
                zipCode: "29730000"
            }
        })
        eventDispatcher.notify(customerChangeAddressEvent);

        // then
        expect(spy1).toHaveBeenCalled()
        expect(spy1).toHaveBeenCalledTimes(1)
    })


    it('should register a event handler', () => {
        // given
        const handler1 = new SendEmailWhenProductCreatedHandler();
        const handler2 = new SendEmailWhenProductCreatedHandler();

        // when
        eventDispatcher.register(ProductCreatedEvent.constructor.name, handler1);
        eventDispatcher.register(ProductCreatedEvent.constructor.name, handler2);

        // then
        expect(eventDispatcher.getHandlers(ProductCreatedEvent.constructor.name)).toBeDefined();
        expect(eventDispatcher.getHandlers(ProductCreatedEvent.constructor.name)?.length).toBe(2);
        expect(eventDispatcher.getHandlers(ProductCreatedEvent.constructor.name)[0]).toBe(handler1);
        expect(eventDispatcher.getHandlers(ProductCreatedEvent.constructor.name)[1]).toBe(handler2);

    });

    it('should unregister a handler', () => {
        const handler1 = new SendEmailWhenProductCreatedHandler();
        const handler2 = new SendEmailWhenProductCreatedHandler();
        eventDispatcher.register(ProductCreatedEvent.constructor.name, handler1);
        eventDispatcher.register(ProductCreatedEvent.constructor.name, handler2);
        expect(eventDispatcher.getHandlers(ProductCreatedEvent.constructor.name)?.length).toBe(2);

        // when
        eventDispatcher.unregister(ProductCreatedEvent.constructor.name, handler1);

        // then
        expect(eventDispatcher.getHandlers(ProductCreatedEvent.constructor.name)).toBeDefined();
        expect(eventDispatcher.getHandlers(ProductCreatedEvent.constructor.name)?.length).toBe(1);
        expect(eventDispatcher.getHandlers(ProductCreatedEvent.constructor.name)[0]).toBe(handler2);

    });

    it('should unregister all handlers', () => {
        const eventHandler = new SendEmailWhenProductCreatedHandler();
        const otherHandler = new SendEmailWhenProductCreatedHandler();
        eventDispatcher.register('Event1', eventHandler);
        eventDispatcher.register('Event2', otherHandler);
        expect(eventDispatcher.getHandlers('Event1')?.length).toBe(1);
        expect(eventDispatcher.getHandlers('Event2')?.length).toBe(1);

        // when
        eventDispatcher.unregisterAll();

        // then
        expect(eventDispatcher.getHandlers('Event1')).toHaveLength(0);
        expect(eventDispatcher.getHandlers('Event2')).toHaveLength(0);
    });

});