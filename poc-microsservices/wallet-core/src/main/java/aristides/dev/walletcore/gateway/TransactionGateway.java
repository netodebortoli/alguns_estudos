package aristides.dev.walletcore.gateway;

import aristides.dev.walletcore.domain.entity.Transaction;

public interface TransactionGateway {
    void save(Transaction t);
}
