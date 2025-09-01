package aristides.dev.portsadapters.product.adapters.out.persistence.jpa;

import aristides.dev.portsadapters.product.core.factory.ProductFactory;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;

@DataJpaTest
@Import(ProductJpaRepositoryAdapter.class)
class ProductJpaRepositoryAdapterIT {

    @Autowired
    private ProductJpaRepositoryAdapter adapter;

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
        // when & then
        var notFoundProduct = adapter.getById(anyString());
        assertTrue(notFoundProduct.isEmpty());
    }

}
