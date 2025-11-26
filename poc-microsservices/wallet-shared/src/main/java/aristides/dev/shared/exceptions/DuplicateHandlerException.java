package aristides.dev.shared.exceptions;

import aristides.dev.shared.events.EventHandler;

public class DuplicateHandlerException extends RuntimeException {
    public DuplicateHandlerException(EventHandler handler) {
        super("Handler " + handler.getClass().getName() + " already registered.");
    }
}
