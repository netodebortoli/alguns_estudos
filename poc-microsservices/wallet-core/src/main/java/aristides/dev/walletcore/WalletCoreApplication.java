package aristides.dev.walletcore;

import aristides.dev.shared.events.EventDispatcher;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WalletCoreApplication {

    private final EventDispatcher dispatcher;

    public WalletCoreApplication(EventDispatcher dispatcher) {
        this.dispatcher = dispatcher;
    }

    public static void main(String[] args) {
        SpringApplication.run(WalletCoreApplication.class, args);
    }

    @PostConstruct
    public void registerHandlers() {
//        this.dispatcher.register("CREATED_TRANSACTION", null);
    }
}
