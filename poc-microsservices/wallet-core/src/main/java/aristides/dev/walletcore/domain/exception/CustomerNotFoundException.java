package aristides.dev.walletcore.domain.exception;

import aristides.dev.walletcore.shared.NotFoundException;

public class CustomerNotFoundException extends NotFoundException {
    public CustomerNotFoundException(String id) {
        super("Customer", id);
    }
}
