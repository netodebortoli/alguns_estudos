package aristides.dev.portsadapters.product.core.impl;

import aristides.dev.portsadapters.product.adapters.out.persistence.jpa.ProductJpaRepository;
import aristides.dev.portsadapters.product.adapters.out.persistence.jpa.ProductJpaRepositoryAdapter;
import aristides.dev.portsadapters.product.core.ports.out.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("it")
class ProductServiceIT {

    private ProductServiceImpl service;

    @BeforeEach
    void setUp(@Autowired ProductRepository repository) {
        this.service = new ProductServiceImpl(repository);
    }

    @Test
    @DisplayName("Should a create and persist a product")
    void testCreateProduct() {
        // when
        var id = service.create("Monitor", new BigDecimal("999.90"));

        // then
        var productFound = service.findById(id);
        assertNotNull(productFound);
    }

    @Test
    @DisplayName("Should update product")
    void testeUpdateProduct() {
        var id = service.create("Monitor", new BigDecimal("999.90"));

        // when
        service.update(id, "LG Monitor", new BigDecimal("1099.99"));

        // then
        var productFound = service.findById(id);
        assertNotNull(productFound);
        assertEquals(new BigDecimal("1099.99"), productFound.getPrice());
        assertEquals("LG Monitor", productFound.getName());
    }

}

@TestConfiguration
class TestConfigurationBeans {
    @Bean
    @Primary
    ProductRepository productRepository(@Autowired ProductJpaRepository productJpaRepository) {
        return new ProductJpaRepositoryAdapter(productJpaRepository);
    }
}
