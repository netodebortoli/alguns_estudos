package aristides.dev.walletcore.infrasctructure.repository.jpa.transaction;

import aristides.dev.walletcore.domain.entity.Transaction;
import aristides.dev.walletcore.infrasctructure.repository.jpa.account.AccountEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transactions")
public class TransactionEntity {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_account_id", nullable = false)
    private AccountEntity from;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_account_id", nullable = false)
    private AccountEntity to;

    private BigDecimal transactionAmount;

    @Column(nullable = false, name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false, name = "updated_at")
    private LocalDateTime updatedAt;

    public static TransactionEntity fromDomain(Transaction transaction, AccountEntity from, AccountEntity to) {
        var transactionEntity = new TransactionEntity();
        transactionEntity.id = transaction.id();
        transactionEntity.from = from;
        transactionEntity.to = to;
        transactionEntity.transactionAmount = transaction.transactionAmount();
        transactionEntity.createdAt = transaction.createdAt();
        transactionEntity.updatedAt = transaction.updatedAt();
        return transactionEntity;
    }
}
