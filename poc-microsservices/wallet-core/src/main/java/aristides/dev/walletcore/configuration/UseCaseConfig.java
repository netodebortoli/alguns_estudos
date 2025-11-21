package aristides.dev.walletcore.configuration;

import aristides.dev.walletcore.gateway.CustomerGateway;
import aristides.dev.walletcore.usecase.create_customer.CreateCustomerUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UseCaseConfig {
    @Bean
    public CreateCustomerUseCase createCustomerUseCase(CustomerGateway customerGateway) {
        return new CreateCustomerUseCase(customerGateway);
    }
}
