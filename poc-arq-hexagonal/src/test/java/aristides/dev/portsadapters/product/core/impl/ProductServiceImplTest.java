package aristides.dev.portsadapters.product.core.impl;

import aristides.dev.portsadapters.product.core.entity.Product;
import aristides.dev.portsadapters.product.core.entity.ProductStatus;
import aristides.dev.portsadapters.product.core.exception.ProductNotFoundException;
import aristides.dev.portsadapters.product.core.factory.ProductFactory;
import aristides.dev.portsadapters.product.core.ports.out.repository.ProductRepository;
import aristides.dev.portsadapters.product.core.vo.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {
    @InjectMocks
    private ProductServiceImpl service;

    @Mock
    private ProductRepository repository;

    @Test
    @DisplayName("Should create product and persist it")
    void testCreateAndPersistProduct() {
        // when
        var idNewProduct = service.create("Monitor", new BigDecimal("999.90"));

        // then
        assertNotNull(idNewProduct);
        verify(repository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("Should find a product by id")
    void testFindProductByIdWithSuccess() {
        // given
        String id = UUID.create().value();
        Product product = ProductFactory.create("Notebook", new BigDecimal(10));
        when(repository.getById(id)).thenReturn(Optional.of(product));

        // when
        Product result = service.findById(id);

        // then
        assertNotNull(result);
        assertEquals(product, result);
    }

    @Test
    @DisplayName("Should throw error when product is not found")
    void testFindProductByIdNotFound() {
        when(repository.getById(anyString())).thenReturn(Optional.empty());
        assertThrows(ProductNotFoundException.class, () -> service.findById(anyString()));
    }

    @Test
    @DisplayName("Should enable product and persist changes")
    void testEnableProduct() {
        // given
        String id = UUID.create().value();
        Product product = ProductFactory.create("Mouse", new BigDecimal("120.00"));
        when(repository.getById(id)).thenReturn(Optional.of(product));

        assertSame(ProductStatus.DISABLED, product.getStatus());

        // when
        service.enable(id);

        // then
        assertSame(ProductStatus.ENABLED, product.getStatus());
        verify(repository, times(1)).getById(id);
        verify(repository, times(1)).save(product);
    }

    @Test
    @DisplayName("Should disable product and persist changes")
    void testDisableProduct() {
        // given
        String id = UUID.create().value();
        Product product = ProductFactory.create("Teclado", new BigDecimal("250.00"));
        product.enable();
        when(repository.getById(id)).thenReturn(Optional.of(product));

        // when
        product.changePrice(new BigDecimal("0"));
        service.disable(id);

        assertSame(ProductStatus.DISABLED, product.getStatus());
        verify(repository, times(1)).getById(id);
        verify(repository, times(1)).save(product);
    }

}
