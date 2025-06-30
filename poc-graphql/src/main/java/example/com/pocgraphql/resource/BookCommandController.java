package example.com.pocgraphql.resource;

import example.com.pocgraphql.entity.Book;
import example.com.pocgraphql.service.BookService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class BookCommandController {
    private final BookService bookService;

    public BookCommandController(BookService bookService) {
        this.bookService = bookService;
    }

    // Usando @MutationMapping para mapear mutações GraphQL, semelhante ao @QueryMapping

    @MutationMapping
    public Book createBook(@Argument String name, @Argument int pageCount, @Argument String authorId) {
        return bookService.create(name, pageCount, authorId);
    }

    @MutationMapping(name = "updateBook")
    public Book update(@Argument String id, @Argument String name, @Argument int pageCount, @Argument String authorId) {
        return bookService.update(id, name, pageCount, authorId);
    }

    @MutationMapping(name = "deleteBook")
    public void delete(@Argument String id) {
        bookService.delete(id);
    }

    // Usando @SchemaMapping para mapear mutações GraphQL

 //   @SchemaMapping(typeName = "Mutation", field = "createBook")
    public Book create(@Argument String name, @Argument int pageCount, @Argument String authorId) {
        return bookService.create(name, pageCount, authorId);
    }

  //  @SchemaMapping(typeName = "Mutation")
    public Book updateBook(@Argument String id, @Argument String name, @Argument int pageCount, @Argument String authorId) {
        return bookService.update(id, name, pageCount, authorId);
    }

   // @SchemaMapping(typeName = "Mutation", field = "deleteBook")
    public void deleteBook(@Argument String id) {
        bookService.delete(id);
    }

}
