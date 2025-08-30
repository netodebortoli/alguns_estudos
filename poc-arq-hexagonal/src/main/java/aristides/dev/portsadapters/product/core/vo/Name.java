package aristides.dev.portsadapters.product.core.vo;

public record Name(String value) {
    public Name {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Name cannot be null or blank");
        }
    }
}
