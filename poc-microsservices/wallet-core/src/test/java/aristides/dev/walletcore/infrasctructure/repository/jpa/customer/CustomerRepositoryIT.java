package aristides.dev.walletcore.infrasctructure.repository.jpa.customer;

import aristides.dev.walletcore.domain.entity.Account;
import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.domain.exception.CustomerNotFoundException;
import aristides.dev.walletcore.infrasctructure.repository.jpa.CustomerJpaRepository;
import aristides.dev.walletcore.infrasctructure.repository.jpa.account.AccountEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
@Import(CustomerRepositoryImpl.class)
@ActiveProfiles("test")
class CustomerRepositoryIT {

    @Autowired
    private CustomerRepositoryImpl customerRepositoryImpl;

    @Autowired
    private CustomerJpaRepository jpaRepository;

    @Test
    void shouldSaveCustomer() {
        // Given
        var customer = new Customer("John Doe", "john@example.com");
        var account = Account.of(customer, new BigDecimal(1000));
        customer.addAccount(account);

        // When
        customerRepositoryImpl.save(customer);

        // Then
        var savedEntity = jpaRepository.findById(customer.id());
        assertThat(savedEntity).isPresent();
        assertThat(savedEntity.get().getId()).isEqualTo(customer.id());
        assertThat(savedEntity.get().getName()).isEqualTo(customer.name());
        assertThat(savedEntity.get().getEmail()).isEqualTo(customer.email());
        assertThat(savedEntity.get().getAccounts()).hasSize(1);
    }

    @Test
    void shouldFindCustomerById() {
        // Given
        var entity = new CustomerEntity();
        entity.setId("456");
        entity.setAccounts(new ArrayList<>());
        entity.setName("Jane Smith");
        entity.setEmail("jane@example.com");
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        var account = new AccountEntity();
        account.setId("acc-123");
        account.setCustomer(entity);
        account.setBalance(new BigDecimal("100"));
        account.setCreatedAt(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        entity.setAccounts(List.of(account));
        jpaRepository.save(entity);

        // When
        var customer = customerRepositoryImpl.findById("456");

        // Then
        assertThat(customer).isNotNull();
        assertThat(customer.id()).isEqualTo("456");
        assertThat(customer.name()).isEqualTo("Jane Smith");
        assertThat(customer.email()).isEqualTo("jane@example.com");
        assertEquals(1, customer.accounts().size());
        assertThat(customer.updatedAt()).isNotNull();
        assertThat(customer.createdAt()).isNotNull();
    }

    @Test
    void shouldThrowErrorWhenNotFindCustomerById() {
        var ex = assertThrows(CustomerNotFoundException.class, () -> customerRepositoryImpl.findById("99988"));
        assertEquals("Customer with id 99988 not found", ex.getMessage());
    }
}
