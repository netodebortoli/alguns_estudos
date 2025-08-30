package aristides.dev.portsadapters.product.core.vo;

import java.math.BigDecimal;

public record Price(BigDecimal value) {
    public Price {
        if (value.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
    }
}
