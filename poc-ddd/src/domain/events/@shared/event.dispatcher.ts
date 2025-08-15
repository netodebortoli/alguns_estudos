import Event from "./event";
import EventHandler from "./event.handler";

// Contrato que define quem registra e notifica todos os handlers
export default interface EventDispatcher {
    notify(event: Event): void;
    register(eventName: string, handler: EventHandler): void;
    unregister(eventName: string, handler: EventHandler): void;
    unregisterAll(): void;
}