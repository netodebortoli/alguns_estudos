package aristides.dev.portsadapters.product.adapters.in.dto;

import java.math.BigDecimal;

public record CreateProductRequest(
        String name,
        BigDecimal price) {
}
