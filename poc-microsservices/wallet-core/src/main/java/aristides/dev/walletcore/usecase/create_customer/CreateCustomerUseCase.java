package aristides.dev.walletcore.usecase.create_customer;

import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.gateway.CustomerGateway;
import aristides.dev.walletcore.shared.UseCase;

public class CreateCustomerUseCase implements UseCase<CreateCustomerInput, CreateCustomerOutput> {

    private final CustomerGateway repository;

    public CreateCustomerUseCase(CustomerGateway customerGateway) {
        this.repository = customerGateway;
    }

    @Override
    public CreateCustomerOutput execute(CreateCustomerInput input) {
        var customer = Customer.of(input.name(), input.email());
        repository.save(customer);
        return new CreateCustomerOutput(
                customer.id(),
                customer.name(),
                customer.email(),
                customer.createdAt(),
                customer.updatedAt()
        );
    }
}
