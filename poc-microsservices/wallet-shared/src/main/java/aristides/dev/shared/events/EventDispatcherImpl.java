package aristides.dev.shared.events;

import aristides.dev.shared.exceptions.DuplicateHandlerException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EventDispatcherImpl implements EventDispatcher {

    private final Map<String, List<EventHandler>> eventHandlers = new HashMap<>();

    @Override
    public void register(String eventName, EventHandler handler) {
        List<EventHandler> handlers = eventHandlers.get(eventName);
        if (handlers == null) {
            handlers = new ArrayList<>();
        } else {
            for (EventHandler existingHandler : handlers) {
                if (existingHandler.getClass().equals(handler.getClass())) {
                    throw new DuplicateHandlerException(handler);
                }
            }
        }
        handlers.add(handler);
        eventHandlers.put(eventName, handlers);
    }

    @Override
    public void dispatch(BaseEvent event) {
        List<EventHandler> handlers = eventHandlers.get(event.name());
        if (handlers != null) {
            for (EventHandler eventHandler : handlers) {
                eventHandler.handle(event); //TODO PONTO DE MELHORIA. Executar em paralelo
            }
        }
    }

    @Override
    public void remove(String eventName, EventHandler handler) {
        List<EventHandler> handlers = eventHandlers.get(eventName);
        if (handlers != null) {
            handlers.removeIf(existingHandler -> existingHandler.getClass().equals(handler.getClass()));
        }
    }

    @Override
    public Boolean has(String eventName, EventHandler handler) {
        List<EventHandler> handlers = eventHandlers.get(eventName);
        if (handlers == null) {
            return false;
        }
        return handlers.stream().anyMatch(existingHandler -> existingHandler.getClass().equals(handler.getClass()));
    }

    @Override
    public void clear() {
        this.eventHandlers.clear();
    }
}
