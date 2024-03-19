package org.aristides_debortoli;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class MeuExemploDinamicoInvocationHandler implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) {
        System.out.println("Método invocado: " + method.getName());
        return 42;
    }
}
