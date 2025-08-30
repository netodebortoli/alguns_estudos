package aristides.dev.portsadapters.product.adapters.out.persistence.jpa;

import aristides.dev.portsadapters.product.adapters.out.persistence.jpa.model.ProductEntity;
import aristides.dev.portsadapters.product.core.entity.Product;
import aristides.dev.portsadapters.product.core.repository.ProductRepository;

import java.util.Optional;

public class ProductJpaRepositoryAdapter implements ProductRepository {

    private final ProductJpaRepository repository;

    public ProductJpaRepositoryAdapter(ProductJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public void save(Product product) {
        repository.save(ProductEntity.fromDomain(product));
    }

    @Override
    public Optional<Product> getById(String id) {
        var productEntity = repository.findById(id);
        return productEntity.map(ProductEntity::toDomain);
    }
}
