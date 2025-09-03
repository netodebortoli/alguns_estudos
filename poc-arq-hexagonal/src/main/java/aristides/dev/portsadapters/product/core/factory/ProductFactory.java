package aristides.dev.portsadapters.product.core.factory;

import aristides.dev.portsadapters.product.core.entity.Product;

import java.math.BigDecimal;

public class ProductFactory {
    private ProductFactory() {
    }

    public static Product create(String name, BigDecimal price) {
        return new Product(name, price);
    }

}
