package aristides.dev.walletcore.domain.entity;

import aristides.dev.walletcore.infrasctructure.repository.jpa.customer.CustomerEntity;
import aristides.dev.walletcore.shared.Entity;

import java.util.LinkedList;
import java.util.List;

public class Customer extends Entity {

    private String name;
    private String email;
    private final List<Account> accounts;

    public Customer(String name, String email) {
        super();
        this.name = name;
        this.email = email;
        this.accounts = new LinkedList<>();
        validate();
    }

    public Customer(CustomerEntity entity) {
        super(entity.getId().toString(), entity.getCreatedAt(), entity.getUpdatedAt());
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.accounts = new LinkedList<>(); //TODO impl
    }

    public static Customer of(String name, String email) {
        return new Customer(name, email);
    }

    public String name() {
        return name;
    }

    public String email() {
        return email;
    }

    public List<Account> accounts() {
        return accounts;
    }

    public void update(String name, String email) {
        this.name = name;
        this.email = email;
        update();
        validate();
    }

    public void addAccount(Account account) {
        if (account == null) {
            this.addError("Account cannot be null");
        }
        if (this.accounts.contains(account)) {
            this.addError("Account already exists");
        }
        if (account != null) {
            if (account.customer() != this) {
                this.addError("Account does not belong to this customer");
            }
        }
        super.validate();
        this.accounts.add(account);
        update();
    }

    protected void validate() {
        if (name == null || name.isBlank()) {
            this.addError("Customer name cannot be null or blank");
        }
        if (email == null || email.isBlank()) {
            this.addError("Customer email cannot be null or blank");
        }
        super.validate();
    }
}
