package proxy;

public class FooDAOProxy implements BaseDAO<Foo> {
    // Normalmente, os Proxy possuem uma inicialização lenta do serviço original
    // Referência ao serviço original
    private final FooDAOImpl implDAO = new FooDAOImpl();

    // Nem sempre é necessário passar a referência ao serviço original no construtor
    // Mas o proxy é quem define o ciclo de vida do serviço
    public FooDAOProxy() {
    }

    // Os métodos são delegados para o serviço original, que implementa a lógica de negócio
    // Nestes exemplos, o Proxy está sendo usado como 'logger'
    @Override
    public Foo getFoo(String id) {
        System.out.println("Getting Foo object from database");
        return implDAO.getFoo(id);
    }

    @Override
    public void insertFoo(Foo foo) {
        System.out.println("Inserting Foo object into database");
        implDAO.insertFoo(foo);
    }
}
