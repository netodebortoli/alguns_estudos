package aristides.dev.walletcore.usecase.create_customer;

import java.time.LocalDateTime;

public record CreateCustomerOutput(
        String id,
        String name,
        String email,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}
