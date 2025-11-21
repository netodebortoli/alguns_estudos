package aristides.dev.walletcore.usecase.create_transaction;

import aristides.dev.walletcore.domain.entity.Account;
import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.gateway.AccountGateway;
import aristides.dev.walletcore.gateway.TransactionGateway;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CreateTransactionUseCaseTest {

    @InjectMocks
    private CreateTransactionUseCase useCase;

    @Mock
    private AccountGateway accountGateway;

    @Mock
    private TransactionGateway repository;

    @Test
    void testCreateTransaction() {
        //given
        var customerFrom = Customer.of("john", "jhon@email.com");
        var accountFrom = Account.of(customerFrom, new BigDecimal(1000));
        var customerTo = Customer.of("jane", "jane@email.com");
        var accountTo = Account.of(customerTo, new BigDecimal(1000));

        when(accountGateway.findById(accountFrom.id())).thenReturn(accountFrom);
        when(accountGateway.findById(accountTo.id())).thenReturn(accountTo);
        doNothing().when(repository).save(any());
        doNothing().when(accountGateway).save(any());

        var input = new CreateTransactionInput(
                accountFrom.id(),
                accountTo.id(),
                new BigDecimal(1000)
        );

        // when
        var output = useCase.execute(input);

        // then
        assertNotNull(output);
        assertNotNull(output.transactionId());
        verify(accountGateway, times(1)).findById(accountFrom.id());
        verify(accountGateway, times(1)).findById(accountTo.id());
        verify(repository, times(1)).save(any());
        verify(accountGateway, times(2)).save(any());
    }

}
