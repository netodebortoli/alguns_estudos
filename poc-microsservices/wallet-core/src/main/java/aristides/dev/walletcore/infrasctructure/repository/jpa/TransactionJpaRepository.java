package aristides.dev.walletcore.infrasctructure.repository.jpa;

import aristides.dev.walletcore.infrasctructure.repository.jpa.transaction.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionJpaRepository extends JpaRepository<TransactionEntity, String> {
}
