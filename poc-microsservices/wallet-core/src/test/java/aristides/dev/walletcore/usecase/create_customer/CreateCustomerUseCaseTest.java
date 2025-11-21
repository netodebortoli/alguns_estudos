package aristides.dev.walletcore.usecase.create_customer;

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
class CreateCustomerUseCaseTest {

    @InjectMocks
    private CreateCustomerUseCase useCase;

    @Mock
    private CustomerGateway repository;

    @Test
    void shouldCreateCustomer() {
        // given
        doNothing().when(repository).save(any());

        var input = new CreateCustomerInput("John", "john@email.com");

        // when
        var result = useCase.execute(input);

        // then
        assertNotNull(result.id());
        assertEquals("John", result.name());
        assertEquals("john@email.com", result.email());
        assertNotNull(result.createdAt());
        assertNotNull(result.updatedAt());
        verify(repository, times(1)).save(any());
    }

    @Test
    void shouldThrowErrorWhenCreateCustomerWithInvalidParams() {
        // given
        var input = new CreateCustomerInput("", "");

        // when
        var ex = assertThrows(RuntimeException.class, () -> useCase.execute(input));

        // then
        assertEquals("Customer name cannot be null or blank, Customer email cannot be null or blank", ex.getMessage());
        verify(repository, times(0)).save(any());
    }

}
