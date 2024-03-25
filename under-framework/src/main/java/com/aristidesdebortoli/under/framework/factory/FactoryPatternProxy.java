package com.aristidesdebortoli.under.framework.factory;

import com.aristidesdebortoli.under.framework.model.Carro;
import com.aristidesdebortoli.under.framework.model.Veiculo;

public class FactoryPatternProxy implements AbstractFactory {
    @Override
    public Veiculo createVeiculo() {
        return new VeiculoProxyImpl(new Carro());
    }
}
