package com.aristidesdebortoli.under.framework.model;

import com.aristidesdebortoli.under.framework.Transaction;

import java.util.UUID;

public class Carro implements Veiculo {

    private UUID id;
    private String nome;
    private String fabricante;

    @Transaction
    @Override
    public void criarVeiculo(String nome, String fabricante) {
        this.nome = nome;
        this.fabricante = fabricante;
        this.id = UUID.randomUUID();
        System.out.println(this);
    }

    public String toString() {
        return "Carro [id=" + id + ", nome=" + nome + ", fabricante=" + fabricante + "]";
    }

}
