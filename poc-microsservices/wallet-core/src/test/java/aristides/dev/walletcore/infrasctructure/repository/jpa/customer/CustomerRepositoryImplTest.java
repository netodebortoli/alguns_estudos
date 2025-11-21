package aristides.dev.walletcore.infrasctructure.repository.jpa.customer;

import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.domain.exception.CustomerNotFoundException;
import aristides.dev.walletcore.infrasctructure.repository.jpa.CustomerJpaRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
@Import(CustomerRepositoryImpl.class)
@ActiveProfiles("test")
class CustomerRepositoryImplTest {

    @Autowired
    private CustomerRepositoryImpl customerRepository;

    @Autowired
    private CustomerJpaRepository jpaRepository;

    @Test
    void shouldSaveCustomer() {
        // Given
        var customer = new Customer("John Doe", "john@example.com");

        // When
        customerRepository.save(customer);

        // Then
        var savedEntity = jpaRepository.findById(customer.id());
        assertThat(savedEntity).isPresent();
        assertThat(savedEntity.get().getId()).isEqualTo(customer.id());
        assertThat(savedEntity.get().getName()).isEqualTo(customer.name());
        assertThat(savedEntity.get().getEmail()).isEqualTo(customer.email());
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
        jpaRepository.save(entity);

        // When
        var customer = customerRepository.findById("456");

        // Then
        assertThat(customer).isNotNull();
        assertThat(customer.id()).isEqualTo("456");
        assertThat(customer.name()).isEqualTo("Jane Smith");
        assertThat(customer.email()).isEqualTo("jane@example.com");
    }

    @Test
    void shouldThrowErrorWhenNotFindCustomerById() {
        var ex = assertThrows(CustomerNotFoundException.class, () -> customerRepository.findById("99988"));
        assertEquals("Customer with id 99988 not found", ex.getMessage());
    }
}
