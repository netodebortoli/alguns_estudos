package proxy;

public interface BaseDAO<T> {
    public T getFoo(String id);
    public void insertFoo(T object);
}
