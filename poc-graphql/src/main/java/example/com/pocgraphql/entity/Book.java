package example.com.pocgraphql.entity;

public record Book(String id, String name, int pageCount, String authorId) {

    public Book update(String name, int pageCount, String authorId) {
        return new Book(this.id, name, pageCount, authorId);
    }

}
