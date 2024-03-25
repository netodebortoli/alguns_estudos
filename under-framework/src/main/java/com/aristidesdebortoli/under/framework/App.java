package com.aristidesdebortoli.under.framework;

import com.aristidesdebortoli.under.framework.factory.AbstractFactory;
import com.aristidesdebortoli.under.framework.factory.FactoryDynamicProxy;
import com.aristidesdebortoli.under.framework.factory.FactoryPatternProxy;

public class App {
    public static void main(String[] args) {
        AbstractFactory factory = new FactoryPatternProxy();
        factory.createVeiculo().criarVeiculo("Civic", "Honda");
        factory = new FactoryDynamicProxy();
        factory.createVeiculo().criarVeiculo("Corolla", "Toyota");
    }
}

