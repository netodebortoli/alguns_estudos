package aristides.dev.portsadapters.product.adapters.in.dto;

import aristides.dev.portsadapters.product.core.entity.Product;

import java.math.BigDecimal;

public record ProductDTO(
        String id,
        String name,
        BigDecimal price,
        String status
) {

    public static ProductDTO fromDomain(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getStatus().name()
        );
    }


}
