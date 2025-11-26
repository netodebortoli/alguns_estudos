package aristides.dev.shared.events;

import aristides.dev.shared.exceptions.DuplicateHandlerException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.logging.Logger;
import java.util.stream.Collectors;

public class EventDispatcherImpl implements EventDispatcher {

    private final Logger logger = Logger.getLogger(EventDispatcherImpl.class.getName());

    //PONTO CRÍTICO: o MAP nao está compartilhado entre threads.
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
            executeHandlers(handlers, event);
        }
    }

    private void executeHandlers(List<EventHandler> handlers, BaseEvent event) {
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            List<Future<?>> futures = handlers.stream()
                    .map(handler -> executor.submit(() -> handler.handle(event)))
                    .collect(Collectors.toUnmodifiableList());
            executor.shutdown();
            futures.forEach(future -> {
                try {
                    future.get(); // Aguarda conclusão das tarefas
                } catch (Exception e) {
                    logger.severe("Error executing event handler: " + e.getMessage());
                }
            });
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
