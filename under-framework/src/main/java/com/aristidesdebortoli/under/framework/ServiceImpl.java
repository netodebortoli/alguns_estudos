package com.aristidesdebortoli.under.framework;

import com.aristidesdebortoli.under.framework.teste.BaseService;

public class ServiceImpl implements BaseService {

    public ServiceImpl() {
    }

    public void cadastrar(Pessoa p) {
        Class<?> clazz = DataBaseImpl.class;
        for (var method : clazz.getDeclaredMethods()) {
            if (method.isAnnotationPresent(Transaction.class)
                    && method.getName().equals("salvar")
                    && method.getParameterTypes()[0].equals(Pessoa.class)) {
                try {
                    System.out.println("Iniciando execução do método " + method.getName());
                    method.invoke(clazz, p);
                    System.out.println("Finalizando execução do método " + method.getName() + " com sucesso!");
                } catch (Exception e) {
                    System.out.println("Finalizando execução do método " + method.getName() + " com erro!");
                    e.printStackTrace();
                }
            }
        }
    }

    public void listar() {
        System.out.println("Iniciando execução do método listar...");
        DataBaseImpl.listar().forEach(p -> System.out.println("id: " + p.id() + " - nome: " + p.nome() + " - cpf: " + p.cpf()));
    }
}
