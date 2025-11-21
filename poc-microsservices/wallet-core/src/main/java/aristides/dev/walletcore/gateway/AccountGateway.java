package aristides.dev.walletcore.gateway;

import aristides.dev.walletcore.domain.entity.Account;

public interface AccountGateway {
    void save(Account account);
    Account findById(String id);
}
