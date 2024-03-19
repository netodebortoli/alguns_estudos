package org.aristides_debortoli;

import java.lang.reflect.Proxy;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        Map proxyInstance = (Map) Proxy.newProxyInstance(
                Main.class.getClassLoader(),
                new Class[]{Map.class},
                new MeuExemploDinamicoInvocationHandler());

//        proxyInstance.put("hello", "world");
//        proxyInstance.get("hello");

        Map proxyInstanceLambda = (Map) Proxy.newProxyInstance(
                Main.class.getClassLoader(),
                new Class[]{Map.class},
                (proxy, method, methodArgs) -> {
                    if (method.getName().equals("get")) {
                        return new Random().nextLong();
                    } else {
                        throw new UnsupportedOperationException(
                                "Unsupported method: " + method.getName());
                    }
                });

        Long result = (Long) proxyInstanceLambda.get("hello");
        System.out.println(result);
//      proxyInstanceLambda.put("hello", "world"); // Unsupported method: put

        Map proxyInstanceTempoDinamico = (Map) Proxy.newProxyInstance(
                Main.class.getClassLoader(),
                new Class[]{Map.class},
                new TempoDinamicoInvocationHandler(new HashMap<>()));

        proxyInstanceTempoDinamico.put("hello", "world");
        proxyInstanceTempoDinamico.put("hi", "world");
        proxyInstanceTempoDinamico.get("hello");
        proxyInstanceTempoDinamico.containsKey("hi");

        CharSequence csProxyInstance = (CharSequence) Proxy.newProxyInstance(
                Main.class.getClassLoader(),
                new Class[]{CharSequence.class},
                new TempoDinamicoInvocationHandler("Hello World"));

        var csReusult = csProxyInstance.length();
        var stringResult = csProxyInstance.subSequence(6, 11);
        System.out.println(csReusult);
        System.out.println(stringResult);
    }
}