package aristides.dev.portsadapters.product.adapters.out.persistence.jpa;

import aristides.dev.portsadapters.product.adapters.out.persistence.jpa.model.ProductEntity;
import aristides.dev.portsadapters.product.core.factory.ProductFactory;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

import java.math.BigDecimal;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Import(ProductJpaRepositoryAdapter.class)
class ProductJpaRepositoryAdapterIT {

    @Autowired
    private ProductJpaRepositoryAdapter adapter;

    @Autowired
    private TestEntityManager em;

    @Test
    @DisplayName("Should save product")
    void testSaveProduct() {
        // given
        var product = ProductFactory.create("Product", new BigDecimal(10));

        // when
        adapter.save(product);

        // then
        var savedProduct = em.find(ProductEntity.class, product.getId());
        assertNotNull(savedProduct);
        assertEquals(product.getId(), savedProduct.getId());
    }

    @Test
    @DisplayName("Should update a product")
    void testUpdateProduct() {
        // given
        var product = ProductFactory.create("Product", new BigDecimal(10));
        adapter.save(product);
        assertNotNull(em.find(ProductEntity.class, product.getId()));

        // when
        product.changePrice(new BigDecimal(11));
        adapter.save(product);

        // then
        var updatedProduct = em.find(ProductEntity.class, product.getId());
        assertNotNull(updatedProduct);
        assertEquals(product.getId(), updatedProduct.getId());
        assertEquals(new BigDecimal(11), updatedProduct.getPrice());
    }

    @Test
    @DisplayName("Should return a empty product when not exists")
    void testFindProductNotFound() {
        // given
        var id = UUID.randomUUID().toString();

        // when
        var notFoundProduct = em.find(ProductEntity.class, id);

        // then
        assertNull(notFoundProduct);

    }

    @Test
    @DisplayName("Should find all products")
    void testFindAllProducts() {
        // given
        adapter.save(ProductFactory.create("Product 1", new BigDecimal(10)));
        adapter.save(ProductFactory.create("Product 2", new BigDecimal(10)));

        // when
        var result = adapter.getAll();

        // then
        assertEquals(2, result.size());
    }

}
