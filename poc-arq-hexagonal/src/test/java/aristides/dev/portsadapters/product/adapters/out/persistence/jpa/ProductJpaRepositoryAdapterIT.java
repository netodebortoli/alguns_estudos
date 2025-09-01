package aristides.dev.portsadapters.product.adapters.out.persistence.jpa;

import aristides.dev.portsadapters.product.adapters.out.persistence.jpa.model.ProductEntity;
import aristides.dev.portsadapters.product.core.factory.ProductFactory;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;

@DataJpaTest
@Import(ProductJpaRepositoryAdapter.class)
class ProductJpaRepositoryAdapterIT {

    @Autowired
    private ProductJpaRepositoryAdapter adapter;

    @Autowired
    private EntityManager em;

    @Test
    @DisplayName("Should save product and find it")
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
    @DisplayName("Should return a empty product when not exists")
    void testFindProductNotFound() {
        // given
        var id = anyString();

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
        var result = em.createQuery("SELECT p FROM ProductEntity p", ProductEntity.class).getResultList();

        // then
        assertEquals(2, result.size());
    }

}
