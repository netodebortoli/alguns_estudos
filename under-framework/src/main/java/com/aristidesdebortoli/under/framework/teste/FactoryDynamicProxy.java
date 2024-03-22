package com.aristidesdebortoli.under.framework.teste;

import com.aristidesdebortoli.under.framework.App;
import com.aristidesdebortoli.under.framework.ServiceImpl;

import java.lang.reflect.Proxy;

public class FactoryDynamicProxy implements AbstractProxyFactory {
    @Override
    public BaseService createProxy() {
        return (BaseService) Proxy.newProxyInstance(
                App.class.getClassLoader(),
                new Class[]{BaseService.class},
                new DynamicProxyImpl(new ServiceImpl()));
    }
}
