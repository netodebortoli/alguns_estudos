package com.aristidesdebortoli.under.framework.factory;

import com.aristidesdebortoli.under.framework.Transaction;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class VeiculoInvocationHandler implements InvocationHandler {

    private Object target;

    public VeiculoInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if (method.isAnnotationPresent(Transaction.class)) {
            System.out.println("Iniciando execução do método: " + method.getName());
            Object result = method.invoke(target, args);
            System.out.println("Finalizando execução do método " + method.getName() + " com sucesso.");
            return result;
        } else {
            System.out.println("Finalizando execução do metodo " + method.getName() + " com erro.");
            return null;
        }
    }
}
