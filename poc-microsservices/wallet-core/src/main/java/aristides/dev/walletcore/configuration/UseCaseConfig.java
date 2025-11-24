package aristides.dev.walletcore.configuration;

import aristides.dev.walletcore.gateway.AccountGateway;
import aristides.dev.walletcore.gateway.CustomerGateway;
import aristides.dev.walletcore.gateway.TransactionGateway;
import aristides.dev.walletcore.usecase.create_account.CreateAccountUseCase;
import aristides.dev.walletcore.usecase.create_customer.CreateCustomerUseCase;
import aristides.dev.walletcore.usecase.create_transaction.CreateTransactionUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UseCaseConfig {
    @Bean
    public CreateCustomerUseCase createCustomerUseCase(CustomerGateway customerGateway) {
        return new CreateCustomerUseCase(customerGateway);
    }

    @Bean
    public CreateAccountUseCase createAccountUseCase(CustomerGateway customerGateway, AccountGateway accountGateway) {
        return new CreateAccountUseCase(customerGateway, accountGateway);
    }

//    @Bean
//    public CreateTransactionUseCase createTransactionUseCase(TransactionGateway transactionGateway,AccountGateway accountGateway) {
//        return new CreateTransactionUseCase(accountGateway, transactionGateway);
//    }
}
