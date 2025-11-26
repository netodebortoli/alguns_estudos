package aristides.dev.shared.events;

@FunctionalInterface
public interface EventHandler {
    void handle(BaseEvent event);
}
