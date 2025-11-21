package aristides.dev.walletcore.infrasctructure.repository.jpa.customer;

import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.infrasctructure.repository.jpa.account.AccountEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "customers")
public class CustomerEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<AccountEntity> accounts;

    @Column(nullable = false, name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false, name = "updated_at")
    private LocalDateTime updatedAt;

    public static CustomerEntity fromDomain(Customer customer) {
        var entity = new CustomerEntity();
        entity.id = customer.id();
        entity.name = customer.name();
        entity.email = customer.email();
        entity.accounts = customer.accounts()
                .stream()
                .map(ac -> AccountEntity.fromDomain(ac, entity))
                .toList();
        entity.createdAt = customer.createdAt();
        entity.updatedAt = customer.updatedAt();
        return entity;
    }
}
