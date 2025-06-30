package example.com.pocgraphql.service;

import example.com.pocgraphql.entity.Book;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookService {

    private static final Map<String, Optional<Book>> books = new HashMap<>();

    static {
        books.put("book-1", Optional.of(new Book("book-1", "Effective Java", 416, "1")));
        books.put("book-2", Optional.of(new Book("book-2", "Clean Code", 464, "2")));
        books.put("book-3", Optional.of(new Book("book-3", "Design Patterns", 395, "3")));
    }

    public Book findById(String id) {
        return books.get(id).orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

    public List<Book> getAll() {
        return books.values().stream()
                .map(Optional::get)
                .toList();
    }

    public Book create(String name, int pageCount, String authorId) {
        var newBook = new Book("book-" + (books.size() + 1), name, pageCount, authorId);
        books.put(newBook.id(), Optional.of(newBook));
        return newBook;
    }

    public Book update(String bookId, String name, int pageCount, String authorId) {
        Book book = findById(bookId);
        Book updatedBook = book.update(name, pageCount, authorId);
        books.put(updatedBook.id(), Optional.of(updatedBook));
        return updatedBook;
    }

    public void delete(String bookId) {
        findById(bookId);
        books.remove(bookId);
    }

}
