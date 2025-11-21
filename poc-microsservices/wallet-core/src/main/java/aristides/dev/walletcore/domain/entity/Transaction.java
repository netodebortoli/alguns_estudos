package aristides.dev.walletcore.domain.entity;

import aristides.dev.walletcore.shared.Entity;

import java.math.BigDecimal;

public class Transaction extends Entity {

    private final Account from;
    private final Account to;
    private final BigDecimal transactionAmount;

    public Transaction(Account from, Account to, BigDecimal transactionAmount) {
        super();
        this.from = from;
        this.to = to;
        this.transactionAmount = transactionAmount;
        validate();
        executeCommit();
    }

    protected void validate() {
        if (from == null) {
            this.addError("From account cannot be null");
        }
        if (to == null) {
            this.addError("To account cannot be null");
        }
        if (transactionAmount == null || transactionAmount.compareTo(BigDecimal.ZERO) < 0) {
            this.addError("Transaction amount cannot be null or negative");
        }
        if (from != null && transactionAmount != null) {
            if (from.balance().compareTo(transactionAmount) < 0) {
                this.addError("Insufficient balance in from account");
            }
        }
        super.validate();
    }

    private void executeCommit() {
        from.withdraw(transactionAmount);
        to.deposit(transactionAmount);
    }
}
