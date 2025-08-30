package aristides.dev.portsadapters.product.core.ports.in;

import aristides.dev.portsadapters.product.core.entity.Product;

public interface FindProductUseCase {
    Product findById(String id);
}
