package com.aristidesdebortoli.under.framework;

import com.aristidesdebortoli.under.framework.teste.AbstractProxyFactory;
import com.aristidesdebortoli.under.framework.teste.FactoryDynamicProxy;
import com.aristidesdebortoli.under.framework.teste.FactoryPatternProxy;

public class App {
    public static void main(String[] args) {
        AbstractProxyFactory factory = new FactoryPatternProxy();
        factory.createProxy().cadastrar(new Pessoa("Astolfo", "000"));
        factory.createProxy().cadastrar(new Pessoa("Afrânio", "111"));
        factory.createProxy().listar();

        factory = new FactoryDynamicProxy();
        factory.createProxy().cadastrar(new Pessoa("Joarez", "222"));
        factory.createProxy().cadastrar(new Pessoa("Getulio", "123"));
        factory.createProxy().listar();
    }
}

