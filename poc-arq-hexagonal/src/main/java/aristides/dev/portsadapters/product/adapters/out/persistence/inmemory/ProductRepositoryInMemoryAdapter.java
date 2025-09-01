package aristides.dev.portsadapters.product.adapters.out.persistence.inmemory;

import aristides.dev.portsadapters.product.core.entity.Product;
import aristides.dev.portsadapters.product.core.ports.out.repository.ProductRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class ProductRepositoryInMemoryAdapter implements ProductRepository {

    private final Map<String, Product> database = new HashMap<>();

    @Override
    public Optional<Product> getById(String id) {
        var product = this.database.get(id);
        if (product != null) {
            return Optional.of(product);
        }
        return Optional.empty();
    }

    @Override
    public List<Product> getAll() {
        return database.values().stream().toList();
    }

    @Override
    public void save(Product product) {
        this.database.put(product.getId(), product);
    }
}
