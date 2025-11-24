package aristides.dev.walletcore.infrasctructure.repository.jpa.transaction;

import aristides.dev.walletcore.domain.entity.Transaction;
import aristides.dev.walletcore.gateway.TransactionGateway;
import aristides.dev.walletcore.infrasctructure.repository.jpa.TransactionJpaRepository;
import aristides.dev.walletcore.infrasctructure.repository.jpa.account.AccountEntity;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

@Repository
public class TransactionRepositoryImpl implements TransactionGateway {

    private final EntityManager entityManager;

    private final TransactionJpaRepository jpaRepository;

    public TransactionRepositoryImpl(EntityManager entityManager, TransactionJpaRepository jpaRepository) {
        this.entityManager = entityManager;
        this.jpaRepository = jpaRepository;
    }

    @Override
    public void save(Transaction transaction) {
        var from = entityManager.getReference(AccountEntity.class, transaction.from().id());
        var to = entityManager.getReference(AccountEntity.class, transaction.to().id());
        var entity = TransactionEntity.fromDomain(transaction, from, to);
        jpaRepository.save(entity);
    }
}
