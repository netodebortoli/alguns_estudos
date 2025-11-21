package aristides.dev.walletcore.domain.exception;

import aristides.dev.walletcore.shared.NotFoundException;

public class AccountNotFoundException extends NotFoundException {
    public AccountNotFoundException(String id) {
        super("Account", id);
    }
}
