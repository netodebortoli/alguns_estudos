package aristides.dev.portsadapters.product.core.impl;

import aristides.dev.portsadapters.product.core.entity.Product;
import aristides.dev.portsadapters.product.core.exception.ProductNotFoundException;
import aristides.dev.portsadapters.product.core.factory.ProductFactory;
import aristides.dev.portsadapters.product.core.ports.in.ChangeProductStatusUseCase;
import aristides.dev.portsadapters.product.core.ports.in.CreateProductUseCase;
import aristides.dev.portsadapters.product.core.ports.in.FindProductUseCase;
import aristides.dev.portsadapters.product.core.ports.out.ProductWriter;
import aristides.dev.portsadapters.product.core.ports.out.ProductReader;

import java.math.BigDecimal;

public class ProductServiceImpl implements FindProductUseCase, CreateProductUseCase, ChangeProductStatusUseCase {
    private final ProductWriter productWriter;
    private final ProductReader productReader;

    public ProductServiceImpl(ProductWriter createProductPort, ProductReader getProductPort) {
        this.productWriter = createProductPort;
        this.productReader = getProductPort;
    }

    @Override
    public String create(String name, BigDecimal price) {
        var product = ProductFactory.create(name, price);
        productWriter.save(product);
        return product.getId();
    }

    @Override
    public Product findById(String id) {
        return productReader.getById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

    @Override
    public void enable(String id) {
        var product = findById(id);
        product.enable();
        productWriter.save(product);
    }

    @Override
    public void disable(String id) {
        var product = findById(id);
        product.disable();
        productWriter.save(product);
    }

}
