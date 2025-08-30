package aristides.dev.portsadapters.product.adapters.out.persistence.inmemory;

import aristides.dev.portsadapters.product.core.factory.ProductFactory;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;

class ProductPersistenceInMemoryAdapterTest {

    private final ProductPersistenceInMemoryAdapter adapter = new ProductPersistenceInMemoryAdapter();

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
        // when
        var notFoundProduct = adapter.getById(anyString());

        assertTrue(notFoundProduct.isEmpty());
    }

}
