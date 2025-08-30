package aristides.dev.portsadapters.product.core.ports.in;

import aristides.dev.portsadapters.product.core.entity.Product;

import java.math.BigDecimal;

public interface CreateProductUseCase {
    String create(String name, BigDecimal price);
}
