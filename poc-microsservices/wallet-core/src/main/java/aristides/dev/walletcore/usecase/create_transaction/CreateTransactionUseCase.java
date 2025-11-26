package aristides.dev.walletcore.usecase.create_transaction;

import aristides.dev.shared.events.EventDispatcher;
import aristides.dev.walletcore.domain.entity.Transaction;
import aristides.dev.walletcore.gateway.AccountGateway;
import aristides.dev.walletcore.gateway.TransactionGateway;
import aristides.dev.walletcore.infrasctructure.events.CreatedTransactionEvent;
import aristides.dev.walletcore.shared.UseCase;
import org.springframework.transaction.annotation.Transactional;

public class CreateTransactionUseCase implements UseCase<CreateTransactionInput, CreateTransactionOutput> {

    private final AccountGateway accountGateway;
    private final TransactionGateway repository;
    private final EventDispatcher eventDispatcher;

    public CreateTransactionUseCase(
            AccountGateway accountGateway,
            TransactionGateway repository,
            EventDispatcher eventDispatcher
    ) {
        this.accountGateway = accountGateway;
        this.repository = repository;
        this.eventDispatcher = eventDispatcher;
    }

    @Override
    @Transactional
    public CreateTransactionOutput execute(CreateTransactionInput input) {
        var from = accountGateway.findById(input.accountFromId());
        var to = accountGateway.findById(input.accountToId());
        var transaction = new Transaction(from, to, input.transactionAmount());
        repository.save(transaction);
        accountGateway.save(from);
        accountGateway.save(to);
        var output = new CreateTransactionOutput(transaction.id());
        eventDispatcher.dispatch(new CreatedTransactionEvent(output));
        return output;
    }
}
