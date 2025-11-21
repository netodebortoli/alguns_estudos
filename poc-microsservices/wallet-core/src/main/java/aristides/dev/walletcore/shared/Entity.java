package aristides.dev.walletcore.shared;

import aristides.dev.walletcore.domain.exception.ValidateEntityException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class Entity {

    private final String id;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private final List<String> errors = new ArrayList<>();
    private boolean isValid = true;

    public Entity() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Entity(
            String id,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String id() {
        return id;
    }

    public LocalDateTime createdAt() {
        return createdAt;
    }

    public LocalDateTime updatedAt() {
        return updatedAt;
    }

    protected void update() {
        this.updatedAt = LocalDateTime.now();
    }

    public void addError(String error) {
        this.errors.add(error);
        this.isValid = false;
    }

    protected void validate() {
        if (!isValid) {
            throw new ValidateEntityException(errors());
        }
    }

    public String errors() {
        return errors.isEmpty() ? "" : String.join(", ", errors).trim();
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Entity entity = (Entity) o;
        return Objects.equals(id, entity.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
