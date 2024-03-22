package com.aristidesdebortoli.under.framework.teste;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class DynamicProxyImpl implements InvocationHandler {

    private final Map<String, Method> methods = new HashMap<>();

    private Object target;

    public DynamicProxyImpl(Object target) {
        this.target = target;
        for (Method method : target.getClass().getDeclaredMethods()) {
            methods.put(method.getName(), method);
        }
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Executação do método " + method.getName() + " via Dyanmic Proxy");
        Object result = methods.get(method.getName()).invoke(target, args);
        System.out.println("Fim da execução do Dynamic Proxy.\n");
        return result != null ? result : "";
    }
}
