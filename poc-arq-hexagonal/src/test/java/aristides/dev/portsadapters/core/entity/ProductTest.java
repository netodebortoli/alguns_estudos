package aristides.dev.portsadapters.core.entity;

import aristides.dev.portsadapters.product.core.entity.ProductStatus;
import aristides.dev.portsadapters.product.core.factory.ProductFactory;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class ProductTest {

    @Test
    @DisplayName("Should create a valid product")
    void testCreateProduct() {
        var product = ProductFactory.create("Product", BigDecimal.TEN);
        assertNotNull(product);
        assertEquals("Product", product.getName());
        assertFalse(product.getId().isBlank());
        assertEquals(BigDecimal.TEN, product.getPrice());
        assertEquals(ProductStatus.DISABLED, product.getStatus());
    }

    @Test
    @DisplayName("Should throw error when create product with invalid price")
    void testCreateProductWithInvalidPrice() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> ProductFactory.create("Product", new BigDecimal(-1)));
        assertEquals("Price cannot be negative", exception.getMessage());
    }

    @Test
    @DisplayName("Should throw error when create product with invalid name")
    void testCreateProductWithInvalidName() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> ProductFactory.create("", new BigDecimal(50)));
        assertEquals("Name cannot be null or blank", exception.getMessage());
    }

    @Test
    @DisplayName("Should enable product")
    void testEnableProduct() {
        // given
        var product = ProductFactory.create("Product", BigDecimal.TEN);
        assertEquals(ProductStatus.DISABLED, product.getStatus());

        //when
        product.enable();

        //then
        assertEquals(ProductStatus.ENABLED, product.getStatus());
    }

    @Test
    @DisplayName("Should throw error when enable product with invalid price")
    void testEnableProductWithInvalidPrice() {
        // given
        var product = ProductFactory.create("Product", BigDecimal.ZERO);
        assertEquals(ProductStatus.DISABLED, product.getStatus());

        //when and then
        IllegalStateException exception = assertThrows(IllegalStateException.class, product::enable);
        assertEquals("The price should be greater than zero to enable the product", exception.getMessage());
    }

    @Test
    @DisplayName("Should disable product")
    void testDisableProduct() {
        // given
        var product = ProductFactory.create("Product", BigDecimal.TEN);
        product.enable();

        //when
        product.changePrice(BigDecimal.ZERO);
        product.disable();

        //then
        assertEquals(ProductStatus.DISABLED, product.getStatus());
    }

    @Test
    @DisplayName("Should throw error when disable product with price greater than zero")
    void testDisableProductWithInvalidPrice() {
        // given
        var product = ProductFactory.create("Product", BigDecimal.TEN);
        product.enable();

        //when and then
        IllegalStateException exception = assertThrows(IllegalStateException.class, product::disable);
        assertEquals("The price should be zero to disable the product", exception.getMessage());
    }

}
