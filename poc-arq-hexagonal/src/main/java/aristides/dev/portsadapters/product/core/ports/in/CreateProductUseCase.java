package aristides.dev.portsadapters.product.core.ports.in;

import java.math.BigDecimal;

public interface CreateProductUseCase {
    String create(String name, BigDecimal price);
}
