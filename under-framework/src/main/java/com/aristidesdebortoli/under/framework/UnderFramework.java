package com.aristidesdebortoli.under.framework;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class UnderFramework {

    record Pessoa(Long id, String nome, String cpf) {
        public Pessoa(String nome, String cpf) {
            this(null, nome, cpf);
        }
    }

    public class MyDatabase {
        private MyDatabase() {
        }

        private static Long sequencial_id = 0L;

        private static final Map<String, Pessoa> db = new HashMap<>();

        @Transaction
        private static void salvar(Pessoa p) {
            Objects.requireNonNull(p.nome(), "Nome não pode ser nulo!");
            Objects.requireNonNull(p.cpf(), "CPF não pode ser nulo!");
            if (db.containsKey(p.cpf)) {
                throw new InvalidObjectException("CPF " + p.cpf() + " já cadastrado!");
            }
            Pessoa newPessoa = new Pessoa(++sequencial_id, p.nome(), p.cpf());
            db.put(p.cpf(), newPessoa);
        }

        public static List<Pessoa> listar() {
            return db.values().stream().toList();
        }
    }

    public class Service {

        public Service() {
        }

        public static void cadastrar(Pessoa p) {
            Class<?> clazz = MyDatabase.class;
            for (var method : clazz.getDeclaredMethods()) {
                if (method.isAnnotationPresent(Transaction.class)
                        && method.getName().equals("salvar")
                        && method.getParameterTypes()[0].equals(Pessoa.class)) {
                    try {
                        System.out.println("\nIniciando execução do método " + method.getName());
                        method.setAccessible(true);
                        method.invoke(clazz, p);
                        System.out.println("Finalizando execução do método " + method.getName() + " com sucesso!");
                    } catch (Exception e) {
                        System.out.println("Finalizando execução do método " + method.getName() + " com erro!");
                        e.printStackTrace();
                    }
                }
            }
        }

        public static void listar() {
            System.out.println("\nIniciando execução do método listar...");
            MyDatabase.listar().forEach(p -> System.out.println("id: " + p.id() + " - nome: " + p.nome() + " - cpf: " + p.cpf()));
        }
    }

    public static void main(String[] args) {
        Service.cadastrar(new Pessoa("Astolfo", "000"));
        Service.cadastrar(new Pessoa("Afrânio", "111"));
        Service.cadastrar(new Pessoa("Geraldo", "222"));
        Service.listar();
        Service.cadastrar(new Pessoa("Provoleno", null));
        Service.cadastrar(new Pessoa("Asdrubal", "000"));

    }
}
