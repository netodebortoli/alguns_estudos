package aristides.dev.shared.events;

import aristides.dev.shared.message.Message;

import java.time.LocalDateTime;

public abstract class BaseEvent extends Message {

    private final String name;
    private final LocalDateTime createdAt;
    private final Object payload;

    public BaseEvent(String eventName, LocalDateTime createdAt, Object payload) {
        super();
        this.name = eventName;
        this.createdAt = createdAt;
        this.payload = payload;
    }

    public String name() {
        return name;
    }

    public LocalDateTime createdAt() {
        return createdAt;
    }

    public Object payload() {
        return payload;
    }

}
