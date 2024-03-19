package org.aristides_debortoli;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class TempoDinamicoInvocationHandler implements InvocationHandler {

    private final Map<String, Method> metodos = new HashMap<>();

    private Object alvo;

    // Ao instanciar um TempoDinamicoInvocationHandler, eu defino o objeto alvo
    // Em seguida, percorro todos os métodos do objeto alvo e armazeno em um Map
    public TempoDinamicoInvocationHandler(Object objetoAlvo) {
        this.alvo = objetoAlvo;
        for (Method method : objetoAlvo.getClass().getDeclaredMethods()) {
            this.metodos.put(method.getName(), method);
        }
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // Inicio de contagem de tempo
        long inicio = System.nanoTime();
        // O resultado da chamada do método é armazenado
        //Busca-se o método no MAP e depóis é utilizado a API Reflection para invocar o método com invoke()
        Object resultado = metodos.get(method.getName()).invoke(alvo, args);
        long fim = System.nanoTime() - inicio;
        System.out.println("Método invocado: " + method.getName() + " - Tempo decorrido (ns): " + fim);
        return resultado;
    }
}
