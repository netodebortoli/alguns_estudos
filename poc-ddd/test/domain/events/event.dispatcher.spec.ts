
import EventDispatcherImpl from '../../../src/domain/events/@shared/event.dispatcher.impl';
import SendEmailWhenProductCreatedHandler from '../../../src/domain/events/product/handlers/send-email-product-created.handler';
import ProductCreatedEvent from '../../../src/domain/events/product/product-created.event';

describe("Event Dispatcher tests unit", () => {

    let eventDispatcher: EventDispatcherImpl;

    beforeEach(() => {
        eventDispatcher = new EventDispatcherImpl();
    });

    it('should notify handlers', () => {
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