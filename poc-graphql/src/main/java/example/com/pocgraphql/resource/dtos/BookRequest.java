package example.com.pocgraphql.resource.dtos;

public record BookRequest(String name, int pageCount, String authorId) {
}
