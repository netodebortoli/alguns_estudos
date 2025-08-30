package aristides.dev.portsadapters.product.core.exception;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(String id) {
        super(String.format("Product with ID %s not found.", id));
    }

}
