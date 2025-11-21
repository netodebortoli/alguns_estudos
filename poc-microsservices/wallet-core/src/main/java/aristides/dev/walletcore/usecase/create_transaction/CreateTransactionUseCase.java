package aristides.dev.walletcore.usecase.create_transaction;

import aristides.dev.walletcore.domain.entity.Transaction;
import aristides.dev.walletcore.gateway.AccountGateway;
import aristides.dev.walletcore.gateway.TransactionGateway;
import aristides.dev.walletcore.shared.UseCase;

public class CreateTransactionUseCase implements UseCase<CreateTransactionInput, CreateTransactionOutput> {

    private final AccountGateway accountGateway;
    private final TransactionGateway repository;

    public CreateTransactionUseCase(
            AccountGateway accountGateway,
            TransactionGateway repository) {
        this.accountGateway = accountGateway;
        this.repository = repository;
    }

    @Override
    public CreateTransactionOutput execute(CreateTransactionInput input) {
        var from = accountGateway.findById(input.accountFromId());
        var to = accountGateway.findById(input.accountToId());
        var transaction = new Transaction(from, to, input.transactionAmount());
        repository.save(transaction);
        accountGateway.save(from);
        accountGateway.save(to);
        return new CreateTransactionOutput(transaction.id());
    }
}
