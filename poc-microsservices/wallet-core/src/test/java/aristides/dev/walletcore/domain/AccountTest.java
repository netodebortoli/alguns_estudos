package aristides.dev.walletcore.domain;

import aristides.dev.walletcore.domain.entity.Account;
import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.domain.exception.ValidateEntityException;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class AccountTest {

    @Test
    void testCreateAccount() {
        var customer = Customer.of("Jonh", "john@email.com");
        var account = Account.of(customer, new BigDecimal(9999));
        assertNotNull(account);
        assertNotNull(account.balance());
        assertNotNull(account.customer());
        assertEquals(new BigDecimal(9999), account.balance());
        assertEquals(customer, account.customer());
    }

    @Test
    void testCreateInvalidAccount() {
        var ex = assertThrows(ValidateEntityException.class, () -> new Account(null));
        assertEquals("Customer cannot be null", ex.getMessage());

        ex = assertThrows(ValidateEntityException.class, () -> Account.of(null, new BigDecimal(-9999)));
        assertEquals("Customer cannot be null, Balance cannot be negative", ex.getMessage());
    }

    @Test
    void testDepositBalanceAccount() {
        var customer = Customer.of("Jonh", "john@email.com");
        var account = Account.of(customer, new BigDecimal(9999));
        account.deposit(new BigDecimal(1));
        assertEquals(new BigDecimal(10000), account.balance());
    }

    @Test
    void testInvalidDeposit() {
        var customer = Customer.of("Jonh", "john@email.com");
        var account = Account.of(customer, new BigDecimal(9999));
        assertThrows(IllegalArgumentException.class, () -> account.deposit(new BigDecimal(-99999)));
    }

    @Test
    void testWithdrawBalanceAccount() {
        var customer = Customer.of("Jonh", "john@email.com");
        var account = Account.of(customer, new BigDecimal(9999));
        account.withdraw(new BigDecimal(1));
        assertEquals(new BigDecimal(9998), account.balance());
    }

    @Test
    void testWithdrawInvalidBalanceAccount() {
        var customer = Customer.of("Jonh", "john@email.com");
        var account = Account.of(customer, new BigDecimal(9999));
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(new BigDecimal(10000)));
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(new BigDecimal(-99999)));
    }

}
