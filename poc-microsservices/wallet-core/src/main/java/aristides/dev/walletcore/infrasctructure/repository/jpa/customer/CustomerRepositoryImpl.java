package aristides.dev.walletcore.infrasctructure.repository.jpa.customer;

import aristides.dev.walletcore.domain.entity.Customer;
import aristides.dev.walletcore.domain.exception.CustomerNotFoundException;
import aristides.dev.walletcore.gateway.CustomerGateway;
import aristides.dev.walletcore.infrasctructure.repository.jpa.CustomerJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerRepositoryImpl implements CustomerGateway {

    private final CustomerJpaRepository jpaRepository;

    public CustomerRepositoryImpl(CustomerJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public void save(Customer customer) {
        var entity = CustomerEntity.fromDomain(customer);
        jpaRepository.save(entity);
    }

    @Override
    public Customer findById(String id) {
        var entity = jpaRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException(id));
        return new Customer(entity);
    }
}
