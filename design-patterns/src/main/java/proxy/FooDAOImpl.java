package proxy;

import java.util.ArrayList;
import java.util.List;

public class FooDAOImpl implements BaseDAO<Foo> {
    private final List<Foo> db = new ArrayList<>();
    @Override
    public Foo getFoo(String id) {
        return new Foo(1L, "Foo");
    }

    @Override
    public void insertFoo(Foo foo) {
        db.add(foo);
    }
}
