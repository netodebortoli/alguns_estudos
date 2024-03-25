package com.aristidesdebortoli.under.framework.factory;

import com.aristidesdebortoli.under.framework.Transaction;
import com.aristidesdebortoli.under.framework.model.Veiculo;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;

public class VeiculoProxyImpl implements Veiculo {

    private Veiculo veiculo;

    public VeiculoProxyImpl(Veiculo veiculo) {
        this.veiculo = veiculo;
    }

    @Override
    public void criarVeiculo(String nome, String fabricante) {
        System.out.println("\nCriando veículo...");
        try {
            for (Method metodo : veiculo.getClass().getDeclaredMethods()) {
                if (metodo.isAnnotationPresent(Transaction.class)
                        && metodo.getName().equals("criarVeiculo")
                        && Arrays.equals(metodo.getParameterTypes(), new Class[]{String.class, String.class})) {
                    System.out.println("Iniciando execução do método: " + metodo.getName());
                    metodo.invoke(veiculo, nome, fabricante);
                    System.out.println("Finalizando execução do método " + metodo.getName() + " com sucesso.");
                }
            }
        } catch (IllegalAccessException | InvocationTargetException e) {
            System.out.println("Finalizando execução com erro.");
            e.printStackTrace();
        }
    }

}
