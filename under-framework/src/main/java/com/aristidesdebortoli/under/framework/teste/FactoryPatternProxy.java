package com.aristidesdebortoli.under.framework.teste;

import com.aristidesdebortoli.under.framework.ServiceImpl;

public class FactoryPatternProxy implements AbstractProxyFactory {
    @Override
    public BaseService createProxy() {
        return new PatternProxyImpl(new ServiceImpl());
    }
}
