package aristides.dev.portsadapters.product.adapters.in.dto;

import java.math.BigDecimal;

public record ProductDTO(
        String id,
        String name,
        BigDecimal price,
        String status
) {
}
