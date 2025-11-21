package aristides.dev.walletcore.infrasctructure.repository.jpa;

import aristides.dev.walletcore.infrasctructure.repository.jpa.account.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountJpaRepository extends JpaRepository<AccountEntity, String> {
}
