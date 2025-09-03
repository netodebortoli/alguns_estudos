package aristides.dev.portsadapters.product.adapters.out.persistence.jpa.model;

import aristides.dev.portsadapters.product.core.entity.Product;
import aristides.dev.portsadapters.product.core.factory.ProductFactory;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class ProductEntity {

    public ProductEntity() {
    }

    public ProductEntity(String id, String name, BigDecimal price, String status) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.status = ProductStatusEnum.valueOf(status);
    }

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductStatusEnum status;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public ProductStatusEnum getStatus() {
        return status;
    }

    public static ProductEntity fromDomain(Product product) {
        return new ProductEntity(product.getId(), product.getName(), product.getPrice(), product.getStatus().name());
    }

    public Product toDomain() {
        return new Product(id, name, price, status.name());
    }

}
