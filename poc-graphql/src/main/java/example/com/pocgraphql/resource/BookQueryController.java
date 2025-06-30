package example.com.pocgraphql.resource;

import example.com.pocgraphql.entity.Author;
import example.com.pocgraphql.entity.Book;
import example.com.pocgraphql.service.AuthorService;
import example.com.pocgraphql.service.BookService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class BookQueryController {

    private final BookService bookService;
    private final AuthorService authorService;

    public BookQueryController(BookService bookService, AuthorService authorService) {
        this.bookService = bookService;
        this.authorService = authorService;
    }

    /**
     * Ao usar a anotacao @QueryMapping, o nome do metodo deve ser o mesmo nome do campo do schema (schema.graphqls) do GraphQL.
     * A anotaçao @Argument é usada para mapear o argumento do GraphQL para o parametro do metodo.
     * Assim, nao precisa de metadados adicionais, diferetemente dos exemplos com @SchemaMapping.
     */
    @QueryMapping
    public Book bookById(@Argument String id) {
        return bookService.findById(id);
    }

    /**
     * Usando QueryMapping, o nome do metodo deve ser o mesmo nome do campo do schema (schema.graphqls) do GraphQL.
     */
    @QueryMapping
    public Author authorById(@Argument String id) {
        return authorService.findById(id);
    }

    @QueryMapping(name = "findAllBooks")
    public List<Book> listAll() {
        return bookService.getAll();
    }

    /**
     * O metodo serve para resolver o campo author de um objeto Book quando uma consulta GraphQL pede informações do autor de um livro.
     * (Sem essa consulta, nao e possivel obter o autor de um livro diretamente, pois o GraphQL não sabe como resolver isso automaticamente).
     * Neste cenário, o nome do metodo deve ser o mesmo nome do campo do schema (schema.graphqls) do GraphQL.
     * Se nao for, pode usar o campo 'field' da anotação @SchemaMapping para mapear.
     */
    @SchemaMapping(typeName = "Book", field = "author")
    public Author author(Book book) {
        return authorService.findById(book.authorId());
    }

    /**
     * Ao usar @SchemaMapping, o campo 'field' da anotaçao deve ser o mesmo nome do campo do schema (schema.graphqls) do GraphQL.
     */
    //@SchemaMapping(typeName = "Query", field = "bookById")
    public Book findBookById(@Argument(name = "id") String bookId) {
        return bookService.findById(bookId);
    }

    /**
     * Ao usar @SchemaMapping, o campo 'field' da anotaçao deve ser o mesmo nome do metodo no schema do GraphQL
     */
    //@SchemaMapping(typeName = "Query", field = "authorById")
    public Author findAuthorById(@Argument(name = "id") String id) {
        return authorService.findById(id);
    }
}
