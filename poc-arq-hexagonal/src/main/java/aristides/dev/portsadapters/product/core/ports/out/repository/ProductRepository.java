package aristides.dev.portsadapters.product.core.ports.out.repository;

import aristides.dev.portsadapters.product.core.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository  {
    void save(Product product);
    Optional<Product> getById(String id);
    List<Product> getAll();
}
