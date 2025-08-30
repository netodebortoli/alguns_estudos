package aristides.dev.portsadapters.product.core.ports.in;

public interface ChangeProductStatusUseCase {
    void enable(String id);
    void disable(String id);
}
