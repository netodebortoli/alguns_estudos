import Event from './event';

// Interface que será executada quando um determinado evento for acionado
export default interface EventHandler<T extends Event = Event> {
    handle(event: T): void;
}