package example.com.pocgraphql.resource;

import example.com.pocgraphql.entity.Author;
import example.com.pocgraphql.entity.Book;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class BookController {
    /**
     * O nome do metodo deve ser o mesmo nome do campo do schema (schema.graphqls) do GraphQL
     * Ou entao, pode-se usar a anotação @QueryMapping para definir o nome do campo.
     * Neste exemplo, estou acessando uma lista estática de livros.
     * Mas eu poderia usar um service, repository ou qualquer outra forma de acessar os dados.
     * A anotaçao @Argument é usada para mapear o argumento do GraphQL para o parametro do metodo.
     */
    @QueryMapping(name = "bookById")
    public Book bookById(@Argument(name = "id") String id) {
        return Book.getById(id);
    }

    /**
     * Este metodo é usado para mapear o campo author do tipo Book.
     * Ele deve ter o mesmo nome do campo do schema (schema.graphqls) do GraphQL.
     */
    @SchemaMapping
    public Author author(Book book) {
        return Author.getById(book.authorId());
    }
}
