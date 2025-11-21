package aristides.dev.walletcore.infrasctructure.repository.jpa;

import aristides.dev.walletcore.infrasctructure.repository.jpa.customer.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerJpaRepository extends JpaRepository<CustomerEntity, String> {
}
