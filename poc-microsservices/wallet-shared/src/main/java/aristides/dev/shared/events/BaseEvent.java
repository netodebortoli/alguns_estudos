package aristides.dev.shared.events;

import java.time.LocalDateTime;

public interface BaseEvent {
    String name();
    LocalDateTime timestamp();
    Object payload();
}
