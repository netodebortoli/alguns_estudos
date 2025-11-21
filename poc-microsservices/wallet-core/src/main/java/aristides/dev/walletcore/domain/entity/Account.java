package aristides.dev.walletcore.domain.entity;

import aristides.dev.walletcore.infrasctructure.repository.jpa.account.AccountEntity;
import aristides.dev.walletcore.shared.Entity;

import java.math.BigDecimal;

public class Account extends Entity {
    private Customer customer;
    private BigDecimal balance;

    private Account() {
        super();
        this.customer = null;
        this.balance = BigDecimal.ZERO;
    }

    public Account(Customer customer) {
        super();
        this.customer = customer;
        this.balance = BigDecimal.ZERO;
        validate();
    }

    public Account(AccountEntity entity, Customer customer) {
        super(entity.getId(), entity.getCreatedAt(), entity.getUpdatedAt());
        this.customer = customer;
        this.balance = entity.getBalance();
    }

    public static Account of(Customer c, BigDecimal balance) {
        var account = new Account();
        account.customer = c;
        account.balance = balance;
        account.validate();
        return account;
    }

    protected void validate() {
        if (this.customer == null) {
            this.addError("Customer cannot be null");
        }
        if (this.balance == null) {
            this.addError("Balance cannot be null");
        }
        if (this.balance.compareTo(BigDecimal.ZERO) < 0) {
            this.addError("Balance cannot be negative");
        }
        super.validate();
    }

    public void deposit(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Amount cannot be null or negative");
        }
        this.balance = this.balance.add(amount);
        update();
    }

    public void withdraw(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Amount cannot be null or negative");
        }
        if (this.balance.compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient balance");
        }
        this.balance = this.balance.subtract(amount);
        update();
    }

    public BigDecimal balance() {
        return balance;
    }

    public Customer customer() {
        return customer;
    }
}
