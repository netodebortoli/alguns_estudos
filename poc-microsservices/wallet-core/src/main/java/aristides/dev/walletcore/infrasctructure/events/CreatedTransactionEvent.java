package aristides.dev.walletcore.infrasctructure.events;

import aristides.dev.shared.events.BaseEvent;

import java.time.LocalDateTime;

public class CreatedTransactionEvent extends BaseEvent {

    public CreatedTransactionEvent(Object payload) {
        super("CREATED_TRANSACTION", LocalDateTime.now(), payload);
    }
}
