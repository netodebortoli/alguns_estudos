package aristides.dev.walletcore.infrasctructure.repository.jpa.transaction;

import aristides.dev.walletcore.domain.entity.Account;
import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.domain.entity.Transaction;
import aristides.dev.walletcore.infrasctructure.repository.jpa.account.AccountEntity;
import aristides.dev.walletcore.infrasctructure.repository.jpa.customer.CustomerEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@ActiveProfiles("test")
@Import(TransactionRepositoryImpl.class)
class TransactionRepositoryIT {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TransactionRepositoryImpl transactionRepository;

    @Test
    void shouldSaveTransaction() {
        // given
        var customerFrom = new Customer("Jhon", "jonata@email.com");
        var customerTo = new Customer("Jane", "janice@email.com");
        var customerEntityFrom = entityManager.persist(CustomerEntity.fromDomain(customerFrom));
        var customerEntityTo = entityManager.persist(CustomerEntity.fromDomain(customerTo));

        var accountFrom = Account.of(customerFrom, new BigDecimal(1000));
        var accountTo = Account.of(customerTo, new BigDecimal(5000));
        entityManager.persist(AccountEntity.fromDomain(accountFrom, customerEntityFrom));
        entityManager.persist(AccountEntity.fromDomain(accountTo, customerEntityTo));

        var transaction = new Transaction(accountFrom, accountTo, new BigDecimal(1000));

        // when
        transactionRepository.save(transaction);

        // then
        var transactionDB = entityManager.find(TransactionEntity.class, transaction.id());
        assertThat(transactionDB).isNotNull();
        assertEquals(transactionDB.getId(), transaction.id());
        assertEquals(transactionDB.getTransactionAmount(), transaction.transactionAmount());
        assertEquals(transactionDB.getFrom().getId(), accountFrom.id());
        assertEquals(transactionDB.getTo().getId(), accountTo.id());
    }
}
