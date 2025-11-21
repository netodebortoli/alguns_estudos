package aristides.dev.walletcore.infrasctructure.repository.jpa.account;

import aristides.dev.walletcore.domain.entity.Account;
import aristides.dev.walletcore.infrasctructure.repository.jpa.customer.CustomerEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "accounts")
public class AccountEntity {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerEntity customer;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal balance;

    @Column(nullable = false, name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false, name = "updated_at")
    private LocalDateTime updatedAt;

    public static AccountEntity fromDomain(
            Account account,
            CustomerEntity customerEntity
    ) {
        var entity = new AccountEntity();
        entity.id = account.id();
        entity.balance = account.balance();
        entity.customer = customerEntity;
        entity.createdAt = account.createdAt();
        entity.updatedAt = account.updatedAt();
        return entity;
    }
}
