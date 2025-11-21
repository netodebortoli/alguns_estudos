package aristides.dev.walletcore.usecase.create_transaction;

import java.math.BigDecimal;

public record CreateTransactionInput(
        String accountFromId,
        String accountToId,
        BigDecimal transactionAmount) {
}
