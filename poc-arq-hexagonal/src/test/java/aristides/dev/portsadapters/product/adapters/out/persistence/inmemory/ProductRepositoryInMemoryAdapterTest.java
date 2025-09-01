package aristides.dev.portsadapters.product.adapters.out.persistence.inmemory;

import aristides.dev.portsadapters.product.core.factory.ProductFactory;
import aristides.dev.portsadapters.product.core.ports.out.repository.ProductRepository;
import aristides.dev.portsadapters.product.core.vo.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class ProductRepositoryInMemoryAdapterTest {

    private final ProductRepository adapter = new ProductRepositoryInMemoryAdapter();

    @Test
    @DisplayName("Should save product and find product")
    void testSaveProduct() {
        // given
        var product = ProductFactory.create("Product", new BigDecimal(10));

        // when
        adapter.save(product);

        // then
        var savedProduct = adapter.getById(product.getId());
        assertTrue(savedProduct.isPresent());
        assertEquals(product.getId(), savedProduct.get().getId());
    }

    @Test
    @DisplayName("Should return a empty product when not exists")
    void testFindProductNotFound() {
        // given
        var id = UUID.create().value();

        // when
        var notFoundProduct = adapter.getById(id);

        // then
        assertTrue(notFoundProduct.isEmpty());
    }

    @Test
    @DisplayName("Should find all products")
    void testFindALlProducts() {
        // given
        adapter.save(ProductFactory.create("Product 1", new BigDecimal(10)));
        adapter.save(ProductFactory.create("Product 2", new BigDecimal(10)));

        // when
        var result = adapter.getAll();

        // then
        assertNotNull(result);
        assertEquals(2, result.size());
    }

}
