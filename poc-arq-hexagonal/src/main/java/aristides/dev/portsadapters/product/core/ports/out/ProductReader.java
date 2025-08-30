package aristides.dev.portsadapters.product.core.ports.out;

import aristides.dev.portsadapters.product.core.entity.Product;

import java.util.Optional;

public interface ProductReader {
    Optional<Product> getById(String id);
}
