package aristides.dev.walletcore.infrasctructure.repository.jpa.customer;

import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.infrasctructure.repository.jpa.account.AccountEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "customers")
public class CustomerEntity {

    @Id
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @OneToMany(mappedBy = "customer")
    private List<AccountEntity> accounts;

    @Column(nullable = false, name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false, name = "updated_at")
    private LocalDateTime updatedAt;

    public static CustomerEntity fromDomain(Customer customer) {
        var entity = new CustomerEntity();
        entity.id = UUID.fromString(customer.id());
        entity.name = customer.name();
        entity.email = customer.email();
        entity.accounts = customer.accounts()
                .stream()
                .map(AccountEntity::fromDomain)
                .toList();
        entity.createdAt = customer.createdAt();
        entity.updatedAt = customer.updatedAt();
        return entity;
    }
}
