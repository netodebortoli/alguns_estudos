package aristides.dev.walletcore.domain;

import aristides.dev.walletcore.domain.entity.Account;
import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.domain.entity.Transaction;
import aristides.dev.walletcore.domain.exception.ValidateEntityException;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class TransactionTest {

    @Test
    void shouldThrowErrorWhenCreateTransactionWithInvalidArgs() {
        var from = new Account(new Customer("John", "john@email.com"));
        var to = new Account(new Customer("Jane", "jane@email.com"));
        var otherAccount = Account.of(from.customer(), new BigDecimal(9999));

        var ex = assertThrows(ValidateEntityException.class, () -> new Transaction(null, null, null));
        assertEquals("From account cannot be null, To account cannot be null, Transaction amount cannot be null or negative", ex.getMessage());

        ex = assertThrows(ValidateEntityException.class, () -> new Transaction(from, null, null));
        assertEquals("To account cannot be null, Transaction amount cannot be null or negative", ex.getMessage());

        ex = assertThrows(ValidateEntityException.class, () -> new Transaction(from, to, null));
        assertEquals("Transaction amount cannot be null or negative", ex.getMessage());

        ex = assertThrows(ValidateEntityException.class, () -> new Transaction(otherAccount, to,  new BigDecimal(10000)));
        assertEquals("Insufficient balance in from account", ex.getMessage());
    }

    @Test
    void shouldCreateTransaction() {
        var johnCustomer = new Customer("John", "john@email.com");
        var janeCustomer = new Customer("Jane", "jane@email.com");
        var from = new Account(johnCustomer);
        var to = new Account(janeCustomer);

        from.deposit(new BigDecimal(100));
        to.deposit(new BigDecimal(0));

        var transaction = new Transaction(from, to, new BigDecimal(100));

        assertNotNull(transaction);
        assertNotNull(transaction.id());
        assertEquals(new BigDecimal(100), to.balance());
        assertEquals(new BigDecimal(0), from.balance());
    }

}
