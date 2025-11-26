package aristides.dev.shared.message;

import java.util.UUID;

public abstract class Message {

    private final String id = UUID.randomUUID().toString();

    public String id() {
        return id;
    }
}
