package example.com.pocgraphql.service;

import example.com.pocgraphql.entity.Author;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthorService {
    private final Map<String, Optional<Author>> authors = Map.of(
            "1", Optional.of(new Author("1", "John", "Doe")),
            "2", Optional.of(new Author("2", "Jane", "Smith")),
            "3", Optional.of(new Author("3", "Alice", "Johnson"))
    );

    public Author findById(String id) {
        return authors.get(id).orElseThrow(() -> new RuntimeException("Author not found with id: " + id));
    }
}
