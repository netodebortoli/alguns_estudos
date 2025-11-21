package aristides.dev.walletcore.domain;

import aristides.dev.walletcore.domain.entity.Account;
import aristides.dev.walletcore.domain.entity.Customer;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CustomerTest {
    @Test
    void testCreateCustomerSuccess() {
        var customer = Customer.of("John", "john@email.com");
        assertNotNull(customer);
        assertNotNull(customer.id());
        assertEquals("John", customer.name());
        assertEquals("john@email.com", customer.email());
        assertNotNull(customer.createdAt());
    }

    @Test
    void testCreateCustomerWithInvalidArgs() {
        assertThrows(IllegalArgumentException.class, () -> Customer.of("", ""));
    }

    @Test
    void testUpdateCustomer() {
        var customer = Customer.of("John", "john@email.com");
        customer.update("jane", "jane@email.com");
        assertNotNull(customer);
        assertNotNull(customer.id());
        assertEquals("jane", customer.name());
        assertEquals("jane@email.com", customer.email());
        assertNotNull(customer.createdAt());
    }

    @Test
    void testUpdateCustomerWithInvalidArgs() {
        var customer = Customer.of("John", "john@email.com");
        assertThrows(IllegalArgumentException.class, () -> customer.update("", ""));
    }

    @Test
    void testAppendAccount() {
        var customer = Customer.of("John", "john@email.com");
        var account = new Account(customer);
        customer.addAccount(account);
        assertEquals(1, customer.accounts().size());
        assertEquals(account, customer.accounts().getFirst());
    }

    @Test
    void shouldThrowErrorWhenAppendInvalidAccount() {
        var customer = Customer.of("John", "john@email.com");
        var ex = assertThrows(IllegalArgumentException.class, () -> customer.addAccount(null));
        assertEquals("Account cannot be null", ex.getMessage());
    }

    @Test
    void shouldNotAppendAccountWhenAlreadyAdded() {
        var customer = Customer.of("John", "john@email.com");
        var account = new Account(customer);
        customer.addAccount(account);

        var ex = assertThrows(IllegalArgumentException.class, () -> customer.addAccount(account));
        assertEquals("Account already exists", ex.getMessage());
    }

    @Test
    void shouldThrowErrorAppendAAccountBelongingToAnotherCustomer() {
        var customer = Customer.of("John", "john@email.com");
        var otherCustomer = Customer.of("Hane", "hane@email.com");

        var account = new Account(otherCustomer);

        var ex = assertThrows(IllegalArgumentException.class, () -> customer.addAccount(account));
        assertEquals("Account does not belong to this customer", ex.getMessage());
    }
}
