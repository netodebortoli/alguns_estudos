package aristides.dev.portsadapters.product.core.ports.out;

import aristides.dev.portsadapters.product.core.entity.Product;

public interface ProductWriter {
    void save(Product product);
}
