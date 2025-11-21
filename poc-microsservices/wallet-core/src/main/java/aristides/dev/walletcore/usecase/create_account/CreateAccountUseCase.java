package aristides.dev.walletcore.usecase.create_account;

import aristides.dev.walletcore.domain.entity.Account;
import aristides.dev.walletcore.gateway.AccountGateway;
import aristides.dev.walletcore.gateway.CustomerGateway;
import aristides.dev.walletcore.shared.UseCase;

public class CreateAccountUseCase implements UseCase<CreateAccountInput, CreateAccountOutput> {

    private final AccountGateway accountGateway;
    private final CustomerGateway customerGateway;

    public CreateAccountUseCase(CustomerGateway customerGateway, AccountGateway repository) {
        this.accountGateway = repository;
        this.customerGateway = customerGateway;
    }

    @Override
    public CreateAccountOutput execute(CreateAccountInput input) {
        var customer = customerGateway.findById(input.customerId());
        var account = new Account(customer);
        accountGateway.save(account);
        return new CreateAccountOutput(account.id());
    }
}
