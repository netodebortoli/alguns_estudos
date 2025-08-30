package aristides.dev.portsadapters.product.core.entity;

import aristides.dev.portsadapters.product.core.vo.Name;
import aristides.dev.portsadapters.product.core.vo.Price;
import aristides.dev.portsadapters.product.core.vo.UUID;

import java.math.BigDecimal;

public class Product {
    private final UUID id;
    private Name name;
    private Price price;
    private ProductStatus status;

    public Product(String name, BigDecimal price) {
        this.id = UUID.create();
        this.name = new Name(name);
        this.price = new Price(price);
        this.status = ProductStatus.DISABLED;
    }

    public Product(String id, String name, BigDecimal price) {
        this.id = new UUID(id);
        this.name = new Name(name);
        this.price = new Price(price);
        this.status = ProductStatus.DISABLED;
    }

    public String getId() {
        return id.value();
    }

    public String getName() {
        return name.value();
    }

    public BigDecimal getPrice() {
        return price.value();
    }

    public ProductStatus getStatus() {
        return status;
    }

    public void enable() {
        if (this.price.value().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalStateException("The price should be greater than zero to enable the product");
        }
        this.status = ProductStatus.ENABLED;
    }

    public void disable() {
        if (!this.price.value().equals(BigDecimal.ZERO)) {
            throw new IllegalStateException("The price should be zero to disable the product");
        }
        this.status = ProductStatus.DISABLED;
    }

    public void changeName(String name) {
        this.name = new Name(name);
    }

    public void changePrice(BigDecimal newPrice) {
        this.price = new Price(newPrice);
    }
}
