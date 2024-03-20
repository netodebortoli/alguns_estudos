package proxy;

public class App {
    public static void main(String[] args) {
        // Instancia do Proxy
        BaseDAO<Foo> proxy = new FooDAOProxy();
        proxy.getFoo("1");
        proxy.insertFoo(new Foo(1L, "Foo"));
    }
}
