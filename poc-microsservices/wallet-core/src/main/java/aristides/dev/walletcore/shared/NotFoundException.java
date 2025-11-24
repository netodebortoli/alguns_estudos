package aristides.dev.walletcore.shared;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String domain, String id) {
        super(String.format("%s with id %s not found", domain, id));
    }

    public NotFoundException(String message) {
        super(message);
    }
}
