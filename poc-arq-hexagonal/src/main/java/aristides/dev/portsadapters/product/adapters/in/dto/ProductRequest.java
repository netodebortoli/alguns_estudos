package aristides.dev.portsadapters.product.adapters.in.dto;

import java.math.BigDecimal;

public record ProductRequest(
        String name,
        BigDecimal price) {
}
