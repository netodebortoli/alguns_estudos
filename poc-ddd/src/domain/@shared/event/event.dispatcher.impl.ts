import EventDispatcher from "./event.dispatcher";
import EventHandler from "./event.handler";
import Event from "./event";

export default class EventDispatcherImpl implements EventDispatcher {
    private eventHandlers = new Map<string, EventHandler[]>();

    notify(event: Event): void {
        // O evento é o nome da classe (event.constructor.name)
        const handlers = this.eventHandlers.get(event.constructor.name) 
        if (handlers) {
            handlers.forEach(eventHandler => eventHandler.handle(event))
        }
    }

    register(eventName: string, handler: EventHandler): void {
        const handlers = this.eventHandlers.get(eventName)
        if (handlers) {
            handlers.push(handler);
        } else {
            this.eventHandlers.set(eventName, [handler])
        }
    }

    unregister(eventName: string, handler: EventHandler): void {
        const handlers = this.eventHandlers.get(eventName)
        if (handlers) {
            const updatedHandlers = handlers.filter(h => h !== handler)
            this.eventHandlers.set(eventName, updatedHandlers);
        }
    }

    unregisterAll(): void {
        this.eventHandlers.clear();
    }

    getHandlers(handler: string): EventHandler[] {
        const handlers = this.eventHandlers.get(handler)
        if (handlers && handlers.length > 0) {
            return handlers;
        }
        return [];
    }

}