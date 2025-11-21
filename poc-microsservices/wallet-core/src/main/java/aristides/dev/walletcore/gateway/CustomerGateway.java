package aristides.dev.walletcore.gateway;

import aristides.dev.walletcore.domain.entity.Customer;

public interface CustomerGateway {
    void save(Customer customer);
    Customer findById(String id);
}
