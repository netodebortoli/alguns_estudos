package aristides.dev.walletcore.usecase.create_account;

import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.domain.exception.CustomerNotFoundException;
import aristides.dev.walletcore.gateway.AccountGateway;
import aristides.dev.walletcore.gateway.CustomerGateway;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CreateAccountUseCaseTest {

    @InjectMocks
    private CreateAccountUseCase useCase;

    @Mock
    private AccountGateway accountGateway;

    @Mock
    private CustomerGateway customerGateway;

    @Test
    void shouldCreateAccount() {
        // given
        var customer = Customer.of("john", "john@email.com");
        when(customerGateway.findById(any())).thenReturn(customer);
        doNothing().when(accountGateway).save(any());
        var input = new CreateAccountInput(customer.id());

        // when
        var output = useCase.execute(input);

        //then
        assertNotNull(output);
        assertNotNull(output.accountId());
        verify(customerGateway, times(1)).findById(any());
        verify(accountGateway, times(1)).save(any());
    }

    @Test
    void shouldThrowErrorWhenCreateAccount() {
        // given
        var customer = Customer.of("john", "john@email.com");
        when(customerGateway.findById(any())).thenThrow(new CustomerNotFoundException(customer.id()));
        var input = new CreateAccountInput(customer.id());

        var ex = assertThrows(CustomerNotFoundException.class, () -> useCase.execute(input));

        assertEquals(
                 String.format("Customer with id %s not found", input.customerId()),
                ex.getMessage()
        );
        verify(customerGateway, times(1)).findById(any());
        verify(accountGateway, times(0)).save(any());
    }
}
