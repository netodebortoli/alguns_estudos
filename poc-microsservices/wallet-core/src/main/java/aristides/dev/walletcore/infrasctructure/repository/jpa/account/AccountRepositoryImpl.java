package aristides.dev.walletcore.infrasctructure.repository.jpa.account;

import aristides.dev.walletcore.domain.entity.Account;
import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.domain.exception.AccountNotFoundException;
import aristides.dev.walletcore.gateway.AccountGateway;
import aristides.dev.walletcore.infrasctructure.repository.jpa.AccountJpaRepository;
import aristides.dev.walletcore.infrasctructure.repository.jpa.customer.CustomerEntity;
import org.springframework.stereotype.Repository;

@Repository
public class AccountRepositoryImpl implements AccountGateway {

    private final AccountJpaRepository repository;

    public AccountRepositoryImpl(AccountJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public void save(Account account) {
        var customerEntity = CustomerEntity.fromDomain(account.customer());
        var entity = AccountEntity.fromDomain(account, customerEntity);
        repository.save(entity);
    }

    @Override
    public Account findById(String id) {
        var entity = repository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException(id));
        var customer = new Customer(entity.getCustomer());
        return new Account(entity, customer);
    }
}
