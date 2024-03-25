package com.aristidesdebortoli.under.framework.factory;

import com.aristidesdebortoli.under.framework.App;
import com.aristidesdebortoli.under.framework.model.Veiculo;

import java.lang.reflect.Proxy;

public class VeiculoDynamicProxyImpl implements Veiculo {

    private Veiculo veiculo;
    private Veiculo proxyVeiculo;

    public VeiculoDynamicProxyImpl(Veiculo veiculo) {
        this.veiculo = veiculo;
        this.proxyVeiculo = (Veiculo) Proxy.newProxyInstance(
                App.class.getClassLoader(),
                new Class[]{Veiculo.class},
                new VeiculoInvocationHandler(veiculo)
        );
    }

    @Override
    public void criarVeiculo(String nome, String fabricante) {
        System.out.println("\nCriando veículo...");
        proxyVeiculo.criarVeiculo(nome, fabricante);
    }

}
