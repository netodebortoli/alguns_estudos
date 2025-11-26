package aristides.dev.walletcore.infrasctructure.events;

import aristides.dev.shared.events.BaseEvent;

import java.time.LocalDateTime;

public class TesteEvent implements BaseEvent {

    @Override
    public String name() {
        return "";
    }

    @Override
    public LocalDateTime timestamp() {
        return null;
    }

    @Override
    public Object payload() {
        return null;
    }
}
