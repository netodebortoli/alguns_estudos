package aristides.dev.walletcore.infrasctructure.repository.jpa.account;

import aristides.dev.walletcore.domain.entity.Account;
import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.domain.exception.AccountNotFoundException;
import aristides.dev.walletcore.infrasctructure.repository.jpa.AccountJpaRepository;
import aristides.dev.walletcore.infrasctructure.repository.jpa.customer.CustomerEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Import(AccountRepositoryImpl.class)
@ActiveProfiles("test")
class AccountRepositoryIT {

    @Autowired
    private AccountJpaRepository jpaRepository;

    @Autowired
    private AccountRepositoryImpl accountRepositoryImpl;

    @Test
    void shouldSaveAccount() {
        // given
        var customer = new Customer("JonDoe", "john@email.com");
        var account = new Account(customer);

        // when
        accountRepositoryImpl.save(account);

        // then
        var savedAccount = jpaRepository.findById(account.id());
        assertTrue(savedAccount.isPresent());
        assertEquals(account.id(), savedAccount.get().getId());
        assertEquals(account.customer().id(), savedAccount.get().getCustomer().getId());
        assertEquals(account.balance(), savedAccount.get().getBalance());
    }

    @Test
    void shouldFindAccountById() {
        var customer = new Customer("JonDoe", "john@email.com");
        var entity = new AccountEntity();
        entity.setId("1223344");
        entity.setBalance(BigDecimal.ZERO);
        entity.setCustomer(CustomerEntity.fromDomain(customer));
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        jpaRepository.save(entity);

        // when
        var foundAccount = accountRepositoryImpl.findById("1223344");

        // then
        assertNotNull(foundAccount);
        assertEquals(entity.getId(), foundAccount.id());
        assertEquals(entity.getBalance(), foundAccount.balance());
        assertEquals(entity.getCustomer().getId(), foundAccount.customer().id());
        assertEquals(entity.getBalance(), foundAccount.balance());
    }

    @Test
    void shouldThrowErrorWhenNotFindAccountById() {
        var ex = assertThrows(AccountNotFoundException.class, () -> accountRepositoryImpl.findById("99988"));
        assertEquals("Account with id 99988 not found", ex.getMessage());
    }

}
