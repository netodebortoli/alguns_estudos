package aristides.dev.shared.events;

public interface EventDispatcher {
    void register(String eventName, EventHandler handler);
    void dispatch(BaseEvent event);
    void remove(String eventName, EventHandler handler);
    Boolean has(String eventName, EventHandler handler);
    void clear();
}
