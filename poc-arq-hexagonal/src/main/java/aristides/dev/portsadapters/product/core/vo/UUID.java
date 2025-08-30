package aristides.dev.portsadapters.product.core.vo;

public record UUID(String value) {
    public UUID {
        if (!validate(value)) {
            throw new IllegalArgumentException("Invalid UUID format");
        }
    }

    public static UUID create() {
        return new UUID(java.util.UUID.randomUUID().toString());
    }

    private boolean validate(String uuid) {
        return uuid.matches("(?i)[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}");
    }
}
