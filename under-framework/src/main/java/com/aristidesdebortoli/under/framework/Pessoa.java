package com.aristidesdebortoli.under.framework;

public record Pessoa(Long id, String nome, String cpf) {
    public Pessoa(String nome, String cpf) {
        this(null, nome, cpf);
    }
}
