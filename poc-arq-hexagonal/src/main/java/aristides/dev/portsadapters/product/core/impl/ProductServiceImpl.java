package aristides.dev.portsadapters.product.core.impl;

import aristides.dev.portsadapters.product.core.entity.Product;
import aristides.dev.portsadapters.product.core.exception.ProductNotFoundException;
import aristides.dev.portsadapters.product.core.factory.ProductFactory;
import aristides.dev.portsadapters.product.core.ports.in.ChangeProductStatusUseCase;
import aristides.dev.portsadapters.product.core.ports.in.CreateProductUseCase;
import aristides.dev.portsadapters.product.core.ports.in.FindProductUseCase;
import aristides.dev.portsadapters.product.core.repository.ProductRepository;

import java.math.BigDecimal;

public class ProductServiceImpl implements FindProductUseCase, CreateProductUseCase, ChangeProductStatusUseCase {
    private final ProductRepository repository;

    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public String create(String name, BigDecimal price) {
        var product = ProductFactory.create(name, price);
        repository.save(product);
        return product.getId();
    }

    @Override
    public Product findById(String id) {
        return repository.getById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

    @Override
    public void enable(String id) {
        var product = findById(id);
        product.enable();
        repository.save(product);
    }

    @Override
    public void disable(String id) {
        var product = findById(id);
        product.disable();
        repository.save(product);
    }

}
